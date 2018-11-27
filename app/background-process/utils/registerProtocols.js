const { app, protocol } = require('electron')
const { parse } = require('url')
const { join } = require('path')


module.exports = function registerProtocols() {
  protocol.registerStandardSchemes(['botcap'])

  app.on('ready', () => {
    protocol.registerFileProtocol('botcap', (request, callback) => {
      const parsed = parse(request.url)

      if (parsed.path === '/') {
        return callback({
          path: join(__dirname, '../../build-in-pages', parsed.hostname + '.html')
        })
      }

      if (parsed.host === 'resources') {
        return callback({
          path: join(__dirname, '../../build-in-pages/resources', parsed.path)
        })
      }

      return callback({
        path: join(__dirname, '../../build-in-pages', parsed.path)
      })
    }, error => {
      if (error) {
        console.error('Failed to register protocol')
      }
    })
  })

}
