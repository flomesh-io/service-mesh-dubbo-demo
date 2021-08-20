//
// Environment variables:
//   PIPY_LOGGER_LISTEN = 9090
//   PIPY_INSTANCE_ID = localhost
//   PIPY_SERVICE_NAME = anonymous
//   PIPY_LOG_SINK = http://127.0.0.1:9000/log
//   PIPY_LOG_AUTH = <empty>
//   PIPY_METRICS_SINK = http://127.0.0.1:9000/metrics
//
// HTTP log output:
//   {
//     "rid": 0,           // <- request ID
//     "sid": 0,           // <- session ID
//     "iid": "localhost", // <- instance ID
//     "dir": "inbound",   // <- direction
//     "proto": "http",
//     "req": {
//       "protocol": "HTTP/1.1",
//       "method": "GET",
//       "path": "/",
//       "headers": {
//         "content-type": "application/json"
//       },
//       "body": null,
//     },
//     "res": {
//       "protocol": "HTTP/1.1",
//       "status": 200,
//       "statusText": "OK",
//       "headers": {
//         "content-type": "application/json"
//       },
//       "body": null
//     },
//     "reqTime": 1622979167297,
//     "resTime": 1622979177971,
//     "reqSize": 1000,
//     "resSize": 2000,
//     "remoteAddr": "192.168.0.200",
//     "remotePort": 12345,
//     "localAddr": "192.168.0.100",
//     "localPort": 8080,
//     "node": {
//       "ip": "127.0.0.1",
//       "name": "localhost"
//     },
//     "pod": {
//       "ns": "default",
//       "ip": "127.0.0.1",
//       "name": "localhost"
//     },
//     "service": {
//       "name": "anonymous"
//     },
//     "target": {
//       "address": "192.168.0.123",
//       "port": 20880
//     },
//     "trace": {
//       "id": "xxx"
//       "span": "xxx"
//       "parent": "xxx"
//       "sampled": "xxx"
//     }
//   }
//
// Dubbo log output:
//   {
//     "rid": 0,           // <- request ID
//     "sid": 0,           // <- session ID
//     "iid": "localhost", // <- instance ID
//     "dir": "inbound",   // <- direction
//     "proto": "dubbo",
//     "req": {
//       "id": "123",
//       "version": "2.0.2",
//       "service.name": "com.service.MyService",
//       "service.version": "1.0.0"
//       "method.name": "sayHello",
//       "method.type": "Ljava/lang/String;"
//       "arguments": [ ... ],
//       "attachments": {}
//     },
//     "res": {
//       "type": 0,
//       "value": "Hello!"
//     },
//     "reqTime": 1622979167297,
//     "resTime": 1622979177971,
//     "reqSize": 1000,
//     "resSize": 2000,
//     "remoteAddr": "192.168.0.200",
//     "remotePort": 12345,
//     "localAddr": "192.168.0.100",
//     "localPort": 20880,
//     "node": {
//       "ip": "127.0.0.1",
//       "name": "localhost"
//     },
//     "pod": {
//       "ns": "default",
//       "ip": "127.0.0.1",
//       "name": "localhost"
//     },
//     "service": {
//       "name": "anonymous"
//     },
//     "target": {
//       "address": "192.168.0.123",
//       "port": 20880
//     },
//     "trace": {
//       "id": "xxx"
//       "span": "xxx"
//       "parent": "xxx"
//       "sampled": "xxx"
//     }
//   }
//
// Metrics output:
//   {
//     "status": {
//       "http": {},
//       "dubbo": {}
//     },
//     "latency": {
//       "http": {
//         "inbound": {
//           "p90": 0,
//           "p95": 0,
//           "p99": 0
//         },
//         "outbound": {
//           "p90": 0,
//           "p95": 0,
//           "p99": 0
//         }
//       },
//       "dubbo": {
//         "inbound": {
//           "p90": 0,
//           "p95": 0,
//           "p99": 0
//         },
//         "outbound": {
//           "p90": 0,
//           "p95": 0,
//           "p99": 0
//         }
//       }
//     }
//   }
//

pipy({
  _INSTANCE_ID: os.env.PIPY_INSTANCE_ID || os.env._pod_UID || 'localhost',
  _LOG_AUTH: os.env.PIPY_LOG_AUTH || undefined,
  _LOG_SINK_URL: new URL(os.env.PIPY_LOG_SINK || 'http://127.0.0.1:9000/log'),
  _METRICS_SINK_URL: new URL(os.env.PIPY_METRICS_SINK || 'http://127.0.0.1:9000/metrics'),

  _SERVICE_INFO: {
    name: os.env.PIPY_SERVICE_NAME || 'anonymous',
  },

  _NODE_INFO: {
    ip: os.env._pod_hostIP || '127.0.0.1',
    name: os.env._pod_nodeName || 'localhost',
  },

  _POD_INFO: {
    ns: os.env._pod_ns || 'default',
    ip: os.env._pod_IP || '127.0.0.1',
    name: os.env._pod_name || os.env.HOSTNAME || 'localhost',
  },

  _CONTENT_TYPES: {
    'text/plain': true,
    'text/html': true,
    'application/json': true,
    'application/xml': true,
    'multipart/form-data': true,
  },

  _counters: {
    http: {},
    dubbo: {},
  },

  _statuses: {
    http: {},
    dubbo: {},
  },

  _percentile: {
    http: {
      inbound: new algo.Percentile([
        1,2,5,7,10,15,20,25,30,40,50,60,70,80,90,100,
        200,300,400,500,1000,2000,5000,10000,30000,60000,
      ]),
      outbound: new algo.Percentile([
        1,2,5,7,10,15,20,25,30,40,50,60,70,80,90,100,
        200,300,400,500,1000,2000,5000,10000,30000,60000,
      ]),
    },
    dubbo: {
      inbound: new algo.Percentile([
        1,2,5,7,10,15,20,25,30,40,50,60,70,80,90,100,
        200,300,400,500,1000,2000,5000,10000,30000,60000,
      ]),
      outbound: new algo.Percentile([
        1,2,5,7,10,15,20,25,30,40,50,60,70,80,90,100,
        200,300,400,500,1000,2000,5000,10000,30000,60000,
      ]),
    },
  },

  _requests: new algo.Cache(10000),
  _responses: new algo.Cache(10000),
  _contentEncoding: null,

  _router: new algo.URLRouter({
    '/log/req/*': msg => (
      ((
        id
      ) => (
        id = msg.head.path.substring(9),
        _requests.set(id, msg),
        _combine(id)
      ))()
    ),

    '/log/res/*': msg => (
      ((
        id
      ) => (
        id = msg.head.path.substring(9),
        _responses.set(id, msg),
        _combine(id)
      ))()
    ),

    '/*': () => new Message({ status: 404 }, 'Not found'),
  }),

  _combine: (id) => (
    ((
      dir, proto, status, attachments,
      req, reqInfo, reqBody, reqHeaders, reqTime, reqType, reqLogBody,
      res, resInfo, resBody, resHeaders, resTime, resType, resLogBody,
    ) => (
      req = _requests.get(id),
      res = _responses.get(id),
      req && res ? (
        _requests.remove(id),
        _responses.remove(id),
        reqHeaders = req.head.headers,
        resHeaders = res.head.headers,
        reqInfo = JSON.parse(reqHeaders['x-pipy-log']),
        resInfo = JSON.parse(resHeaders['x-pipy-log']),
        delete reqHeaders['x-pipy-log'],
        delete resHeaders['x-pipy-log'],
        reqTime = reqInfo.time,
        resTime = resInfo.time,
        reqType = reqHeaders['content-type']?.split?.(';')?.[0],
        resType = resHeaders['content-type']?.split?.(';')?.[0],
        reqLogBody = Boolean(_CONTENT_TYPES[reqType]),
        resLogBody = Boolean(_CONTENT_TYPES[resType]),
        dir = reqInfo.dir,
        proto = reqInfo.proto,
        status = resInfo.status,
        _counters[proto].total = (_counters[proto].total|0) + 1,
        _statuses[proto][status] = (_statuses[proto][status]|0) + 1,
        _percentile[proto][dir]?.score?.(resTime - reqTime),
        proto === 'dubbo' ? (
          reqBody = Hessian.decode(req.body),
          resBody = Hessian.decode(res.body),
          reqBody && resBody ? (
            attachments = reqBody.pop(),
            status !== 20 && (_counters[proto].error = (_counters[proto].error|0) + 1),
            new Message(
              JSON.encode({
                rid: +id,
                sid: reqInfo.session,
                iid: _INSTANCE_ID,
                dir,
                proto,
                req: {
                  id: reqInfo.id,
                  version: reqBody?.[0],
                  'service.name': reqBody?.[1],
                  'service.version': reqBody?.[2],
                  'method.name': reqBody?.[3],
                  'method.type': reqBody?.[4],
                  arguments: reqBody,
                  attachments,
                },
                res: {
                  status,
                  type: resBody?.[0],
                  value: resBody?.[1],
                },
                reqTime,
                resTime,
                reqSize: req.body.size,
                resSize: res.body.size,
                remoteAddr: reqInfo.remoteAddr,
                remotePort: reqInfo.remotePort,
                localAddr: reqInfo.localAddr,
                localPort: reqInfo.localPort,
                target: reqInfo.target,
                node: _NODE_INFO,
                pod: _POD_INFO,
                service: _SERVICE_INFO,
                trace: {
                  id: attachments?.['X-B3-TraceId'],
                  span: attachments?.['X-B3-SpanId'],
                  parent: attachments?.['X-B3-ParentSpanId'],
                  sampled: attachments?.['X-B3-Sampled'],
                },
              }).push('\n')
            )
          ) : new Message
        ) : (
          status >= 400 && (_counters[proto].error = (_counters[proto].total|0) + 1),
          new Message(
            JSON.encode({
              rid: +id,
              sid: reqInfo.session,
              iid: _INSTANCE_ID,
              dir,
              proto,
              req: {
                protocol: reqInfo.protocol,
                method: reqInfo.method,
                path: reqInfo.path,
                headers: reqHeaders,
                body: reqLogBody ? req.body.toString() : undefined,
              },
              res: {
                protocol: resInfo.protocol,
                status,
                statusText: resInfo.statusText,
                headers: resHeaders,
                body: resLogBody ? res.body.toString() : undefined,
              },
              reqTime,
              resTime,
              reqSize: reqInfo.size,
              resSize: resInfo.size,
              remoteAddr: reqInfo.remoteAddr,
              remotePort: reqInfo.remotePort,
              localAddr: reqInfo.localAddr,
              localPort: reqInfo.localPort,
              target: reqInfo.target,
              node: _NODE_INFO,
              pod: _POD_INFO,
              service: _SERVICE_INFO,
              trace: {
                id: reqHeaders['x-b3-traceid'],
                span: reqHeaders['x-b3-spanid'],
                parent: reqHeaders['x-b3-parentspanid'],
                sampled: reqHeaders['x-b3-sampled'],
              },
            }).push('\n')
          )
        )
      ) : new Message
    ))()
  ),
})

// Request/response input
.listen(os.env.PIPY_LOGGER_LISTEN || 9090)
  .decodeHttpRequest()
  .onMessageStart(
    msg => _contentEncoding = msg.head.headers['content-encoding']
  )
  .link(
    'decompress', () => _contentEncoding === 'gzip',
    'bypass'
  )
  .replaceMessage(
    msg => _router.find(msg.head.path)(msg)
  )
  .merge('batch')
  .dummy()

.pipeline('decompress')
  .decompressMessageBody('inflate')

// Accumulate log messages into batches
.pipeline('batch')
  .pack(
    1000,
    {
      timeout: 5,
    }
  )
  .replaceMessageStart(
    () => new MessageStart({
      method: 'POST',
      path: _LOG_SINK_URL.path,
      headers: {
        'Host': _LOG_SINK_URL.host,
        'Content-Type': 'application/json',
        'Authorization': _LOG_AUTH,
      }
    })
  )
  .encodeHttpRequest()
  .connect(
    () => _LOG_SINK_URL.host,
    {
      bufferLimit: '8m',
    }
  )

// Regularly push metrics out
.task('5s')
  .replaceMessage(
    () => new Message(
      {
        method: 'POST',
        path: _METRICS_SINK_URL.path,
        headers: {
          'content-type': 'application/json',
        },
      },
      JSON.encode({
        counts: _counters,
        status: _statuses,
        latency: {
          http: {
            inbound: {
              p90: _percentile.http.inbound.calculate(90),
              p95: _percentile.http.inbound.calculate(95),
              p99: _percentile.http.inbound.calculate(99),
            },
            outbound: {
              p90: _percentile.http.outbound.calculate(90),
              p95: _percentile.http.outbound.calculate(95),
              p99: _percentile.http.outbound.calculate(99),
            },
          },
          dubbo: {
            inbound: {
              p90: _percentile.dubbo.inbound.calculate(90),
              p95: _percentile.dubbo.inbound.calculate(95),
              p99: _percentile.dubbo.inbound.calculate(99),
            },
            outbound: {
              p90: _percentile.dubbo.outbound.calculate(90),
              p95: _percentile.dubbo.outbound.calculate(95),
              p99: _percentile.dubbo.outbound.calculate(99),
            },
          },
        },
      })
    )
  )
  .mux('send-metrics')
  .replaceMessage(
    () => (
      _counters.http = {},
      _counters.dubbo = {},
      _statuses.http = {},
      _statuses.dubbo = {},
      _percentile.http.inbound.reset(),
      _percentile.http.outbound.reset(),
      _percentile.dubbo.inbound.reset(),
      _percentile.dubbo.outbound.reset(),
      new SessionEnd
    )
  )

.pipeline('send-metrics')
  .encodeHttpRequest()
  .connect(
    () => _METRICS_SINK_URL.host
  )
  .decodeHttpResponse()

.pipeline('bypass')