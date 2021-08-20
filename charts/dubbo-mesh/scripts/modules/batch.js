pipy({
  _BATCH_SIZE: 1000,
  _BATCH_TIMEOUT: 5000,

  _g: {
    buffer: new Data,
    bufferSize: 0,
    bufferTime: 0,
    url: null,
    headers: null,
  },
})

.pipeline('batch')
  .fork('accumulate')

// Accumulate log messages into batches
.pipeline('accumulate')
  .replaceMessage(
    msg => (
      !_g.url && (_g.url = new URL(__argv[0].url)),
      !_g.headers && (_g.headers = __argv[0].headers),
      msg.body.size > 0 && (
        _g.buffer.push(msg.body),
        _g.bufferSize++
      ),
      (_g.bufferSize >= _BATCH_SIZE ||
      (_g.bufferSize > 0 && Date.now() - _g.bufferTime > _BATCH_TIMEOUT)) ? (
        new Message(_g.buffer)
      ) : (
        null
      )
    )
  )
  .replaceMessage(
    msg => (
      _g.buffer = new Data,
      _g.bufferSize = 0,
      _g.bufferTime = Date.now(),
      new Message(
        {
          method: 'POST',
          path: _g.url.path,
          headers: {
            ..._g.headers,
            'host': _g.url.host,
            'User-Agent': 'PIPY/0.4.0',
            'Accept': '*/*',
          },
        },
        msg.body
      )
    )
  )
  .mux('mux')

// Shared logging session
.pipeline('mux')
  .encodeHttpRequest()
  .connect(
    () => _g.url.host
  )
  .decodeHttpResponse()

// Regularly flush the logging session
.task('1s')
  .link(
    'flush', () => _g.url,
    'bypass'
  )
  .replaceMessage(new SessionEnd)

.pipeline('flush')
  .fork('accumulate')

.pipeline('bypass')