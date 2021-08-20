pipy({
  _g: {
    configVersion: 0,
  },

  _configVersion: undefined,
  _configUpdated: undefined,
  _url: null,
})

.pipeline('check')
  .link(
    'check-config-http', () => __argv[0].startsWith('http://'),
    'check-config-file'
  )

// Check configuration in file
.pipeline('check-config-file')
  .onMessageStart(
    () => (
      _configVersion = os.stat(__argv[0])?.mtime | 0,
      _configVersion !== _g.configVersion && (
        _g.configVersion = _configVersion,
        _configUpdated = true
      )
    )
  )
  .link(
    'update-config-file', () => _configUpdated,
    'end-of-task'
  )

// Update configuration from file
.pipeline('update-config-file')
  .onSessionStart(
    () => (
      console.log('Updating configuration...'),
      __argv[1](JSON.decode(os.readFile(__argv[0]))),
      console.log('Configuration updated.')
    )
  )
  .link('end-of-task')

// Check configuration via HTTP
.pipeline('check-config-http')
  .replaceMessage(
    () => (
      _url = new URL(__argv[0] + '/version'),
      new Message({
        method: 'GET',
        path: _url.path,
        headers: {
          Host: _url.host,
        },
      })
    )
  )
  .encodeHttpRequest()
  .connect(() => _url.host)
  .decodeHttpResponse()
  .replaceMessage(msg => (
      msg.head.status === 200 && (
          _configUpdated = msg.body.toString() != _g.configVersion,
          _g.configVersion = msg.body.toString()
      ),
      msg
  ))
  .link(
    'update-config-http', () => _configUpdated,
    'end-of-task'
  )

// Update configuration from HTTP
.pipeline('update-config-http')
  .onSessionStart(
    () => console.log('Updating configuration...')
  )
  .replaceMessage(
    () => (
      _url = new URL(__argv[0]),
      new Message({
        method: 'GET',
        path: _url.path,
        headers: {
          Host: _url.host,
        },
      })
    )
  )
  .encodeHttpRequest()
  .connect(
    () => _url.host
  )
  .decodeHttpResponse()
  .onMessageBody(
    body => (
      __argv[1](JSON.decode(body)),
      console.log('Configuration updated.')
    )
  )
  .link('end-of-task')

// End of task
.pipeline('end-of-task')
  .replaceMessage(new SessionEnd)