//
// Environment variables:
//   PIPY_LISTEN_OUTBOUND_SOCKS = 1080
//   PIPY_LISTEN_INBOUND_DUBBO = 20881
//   PIPY_SERVICE_DUBBO_ADDR = 127.0.0.1:20880
//   PIPY_CONFIG_SRV_URL = http://127.0.0.1:9000/config
//   PIPY_LOGGER = http://127.0.0.1:9090/log
//
// Configuration:
//   {
//     "version": 0,
//     "inbound": {
//       "whitelist": [],
//       "blacklist": [],
//       "circuitBreak": false,
//       "rateLimit": 0,
//       "dataLimit": 0,
//       "canary": {
//         "time": 1622949797851,
//         "duration": 3600,
//         "target": "127.0.0.1:30881"
//       },
//       "cache": {
//         "size": 1000,
//       }
//     },
//     "outbound": {
//       "rateLimit": 0,
//       "dataLimit": 0
//     }
//   }
//

pipy({
  _LOGGER_URL: new URL(os.env.PIPY_LOGGER || 'http://127.0.0.1:9090/log'),

  _g: {
    configInbound: null,
    configOutbound: null,
    responseCache: null,
    autoRequestID: 0,
  },

  _direction: '',
  _queue: null,
  _outboundAddr: '',
  _outboundPort: '',
  _autoRequestID: 0,
  _cached: false,
  _cachedKey: null,
})

  //
  // Outbound traffic
  //

  .listen(os.env.PIPY_LISTEN_OUTBOUND_SOCKS || 1080)
  .proxySOCKS4(
    'outbound',
    (addr, port) => (
      _outboundAddr = addr,
        _outboundPort = port,
        true
    )
  )

  .pipeline('outbound')
  .link(
    'outbound-middleware', () => _outboundPort === 2181 || _outboundPort === 5672 || _outboundPort === 6379 || _outboundPort === 3306,
    'outbound-dubbo'
  )

  .pipeline('outbound-middleware')
  .connect(
    () => `${_outboundAddr}:${_outboundPort}`
  )

  .pipeline('outbound-dubbo')
  .onSessionStart(
    () => (
      _direction = 'outbound',
        _queue = []
    )
  )
  .tap(
    () => (_g.configOutbound.dataLimit || -1) + 'k'
  )
  .decodeDubbo()
  .tap(
    () => (_g.configOutbound.rateLimit || -1)
  )
  .fork('log-request')
  .encodeDubbo()
  .connect(
    () => `${_outboundAddr}:${_outboundPort+1}`
  )
  .fork('log-response')

  //
  // Inbound traffic
  //

  .listen(os.env.PIPY_LISTEN_INBOUND_DUBBO || 20881)
  .decodeDubbo()
  .link('canary')

  .pipeline('canary')
  .link(
    'forward', () => (
      ((
        canary,
        now,
        hash,
      ) => (
        canary = _g.configInbound.canary,
        canary && canary.time && (
          now = Date.now(),
          now > canary.time && (
            hash = algo.hash(__inbound.remoteAddress) % (canary.duration * 1000),
            hash < now - canary.time
          )
        )
      ))()
    ),
    'inbound'
  )

  .pipeline('forward')
  .encodeDubbo()
  .connect(
    () => _g.configInbound.canary.target
  )

  .pipeline('inbound')
  .onSessionStart(
    () => (
      _direction = 'inbound',
        _queue = []
    )
  )
  .tap(
    () => (_g.configInbound.dataLimit || -1) + 'k'
  )
  .tap(
    () => (_g.configInbound.rateLimit || -1)
  )
  .fork('log-request')
  .link(
    'circuit-break', () => _g.configInbound?.circuitBreak,
    'deny', () => _g.configInbound.whitelist && (
      !_g.configInbound.whitelist.some(mask => mask.contains(__inbound.remoteAddress))
    ),
    'deny', () => _g.configInbound.blacklist && (
      _g.configInbound.blacklist.some(mask => mask.contains(__inbound.remoteAddress))
    ),
    'cache', () => _g.responseCache,
    'pass'
  )
  .fork('log-response')

  .pipeline('cache')
  .replaceMessage(
    msg => (
      ((body, result) => (
        body = Hessian.decode(msg.body),
          body?.pop?.(),
          _cachedKey = JSON.stringify(body),
          result = _g.responseCache.get(_cachedKey),
          result ? (
            _cached = true,
              new Message(
                {
                  isRequest: false,
                },
                result
              )
          ) : (
            _cached = false,
              msg
          )
      ))()
    )
  )
  .link(
    'cache-return', () => _cached,
    'pass'
  )

  .pipeline('cache-return')
  .encodeDubbo()

  .pipeline('pass')
  .encodeDubbo()
  .connect(os.env.PIPY_SERVICE_DUBBO_ADDR || '127.0.0.1:20880')

  .pipeline('circuit-break')
  .replaceMessage(
    msg => new Message(
      {
        id: msg.head.id,
        status: 80, // SERVER_ERROR
        isRequest: false,
      },
      Hessian.encode([0, 'Request denied']),
    )
  )
  .encodeDubbo()

  .pipeline('deny')
  .replaceMessage(
    msg => new Message(
      {
        id: msg.head.id,
        status: 80, // SERVER_ERROR
        isRequest: false,
      },
      Hessian.encode([0, 'Request denied']),
    )
  )
  .encodeDubbo()

  //
  // Logging
  //

  .pipeline('log-request')
  .replaceMessage(
    msg => (
      _queue.push(++_g.autoRequestID),
        new Message(
          {
            method: 'POST',
            path: `${_LOGGER_URL.path}/req/${_g.autoRequestID}`,
            headers: {
              'x-pipy-log': JSON.stringify({
                dir: _direction,
                proto: 'dubbo',
                id: msg.head.id,
                remoteAddr: __inbound.remoteAddress,
                remotePort: __inbound.remotePort,
                localAddr: __inbound.localAddress,
                localPort: __inbound.localPort,
                session: __inbound.id,
                time: Date.now(),
                target: _direction === 'outbound' ? {
                  address: _outboundAddr,
                  port: _outboundPort,
                } : {
                  address: __inbound.localAddress,
                  port: __inbound.localPort,
                },
              }),
            },
          },
          msg.body
        )
    )
  )
  .merge('send-log')

  .pipeline('log-response')
  .decodeDubbo()
  .replaceMessage(
    msg => (
      _g.responseCache && !_cached && (
        _g.responseCache.set(_cachedKey, msg.body)
      ),
        new Message(
          {
            method: 'POST',
            path: `${_LOGGER_URL.path}/res/${_queue.shift()}`,
            headers: {
              'x-pipy-log': JSON.stringify({
                time: Date.now(),
                status: msg.head.status,
              }),
            },
          },
          msg.body
        )
    )
  )
  .merge('send-log')

  .pipeline('send-log')
  .encodeHttpRequest()
  .pack(
    1000,
    {
      timeout: 5,
    }
  )
  .connect(
    () => _LOGGER_URL.host,
    {
      bufferLimit: '8m',
    }
  )

  //
  // Configuration update
  //

  .task('5s')
  .use(
    'modules/config.js',
    'check',
    os.env.PIPY_CONFIG_SRV_URL || 'http://127.0.0.1:9000/config',
    config => (
      _g.configInbound = config.inbound,
        _g.configInbound.whitelist = config.inbound.whitelist?.map?.(cidr => new Netmask(cidr)),
        _g.configInbound.blacklist = config.inbound.blacklist?.map?.(cidr => new Netmask(cidr)),
        _g.responseCache = config.inbound.cache ? new algo.Cache(config.inbound.cache.size) : null,
        _g.configOutbound = config.outbound
    )
  )