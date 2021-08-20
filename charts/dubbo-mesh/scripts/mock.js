pipy({
  _g: {
    config: {
      version: 0,
    },
    responseVariation: 0,
  },

  _router: new algo.URLRouter({
    '/config/version': () => new Message(
      _g.config.version.toString()
    ),

    '/config': () => new Message(
      JSON.encode(_g.config)
    ),

    '/log': req => (
      // console.log('[LOG]', req.body.toString()),
      new Message('OK')
    ),

    '/metrics': req => (
      // console.log('[METRICS]', req.body.toString()),
      new Message('OK')
    ),

    '/*': () => new Message(
      { status: 404 }, 'Not found'
    )
  })
})

// Test driver: drives Dubbo with HTTP
.listen(6080)
  .decodeHttpRequest()
  .replaceMessageBody(
    body => Hessian.encode(
      JSON.decode(body)
    )
  )
  .encodeDubbo()
  .connect('127.0.0.1:20881')
  .decodeDubbo()
  .replaceMessageBody(
    body => JSON.encode(
      Hessian.decode(body)
    )
  )
  .encodeHttpResponse()

.listen(20880)
  .decodeDubbo()
  .replaceMessage(
    msg => new Message(
      {
        id: msg.head.id,
        status: 20,
        isRequest: true,
      },
      Hessian.encode([++_g.responseVariation, 'Hi, there!'])
    )
  )
  .encodeDubbo()

.listen(30881)
  .decodeDubbo()
  .replaceMessage(
    msg => new Message(
      {
        id: msg.head.id,
        status: 20,
        isRequest: true,
      },
      Hessian.encode([1, 'Hi, canary!'])
    )
  )
  .encodeDubbo()

.listen(9000)
  .decodeHttpRequest()
  .replaceMessage(
    req => (
      _router.find(req.head.path)(req)
    )
  )
  .encodeHttpResponse()

.task('1s')
  .use(
    'modules/config.js',
    'check',
    'config.json',
    config => (
      _g.config = {
        ...config,
        version: Date.now(),
      }
    )
  )