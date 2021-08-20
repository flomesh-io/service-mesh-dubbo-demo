pipy({
  _g: {
    configInbound: null,
    configOutbound: null,
    responseCache: null,
    autoRequestID: 0,
  },

  _httpTarget: null,
})

  //
  // Inbound traffic
  //
.listen(os.env.PIPY_LISTEN_INBOUND_HTTP || 8080)
  .decodeHttpRequest()
  .handleMessageStart(
    (msg, ver, canary) => (
      console.log("msg.head.headers=" + JSON.stringify(msg.head.headers)),
      ver = msg.head.headers['x-canary-version'],
      console.log("X-CANARY-VERSION=" + ver),
      canary = _g.configInbound.canary,
      console.log("CANARY TARGETS=" + JSON.stringify(canary)),
      ver && canary ? (
        _httpTarget = canary[ver]
      ) : (
        _httpTarget = _g.configInbound.defaultTarget
      ),
      console.log("_httpTarget=" + _httpTarget)
    )
  )
  .link(
    'process', () => _httpTarget != undefined,
    '404'
  )

.pipeline('process')
  .encodeHttpRequest()
  .connect(() => _httpTarget)

.pipeline('404')
  .replaceMessage(
    new Message(
      {
        status: 404,
        headers: {
          'content-type': 'text/plain',
        },
      },
      'Not Found\n'
    )
  )
  .encodeHttpResponse()

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