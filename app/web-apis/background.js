var rpc = require('pauls-electron-rpc')
var commonManifest = require('./manifests/common')

var api = rpc.exportAPI('common', commonManifest, {
  getPlatform: async () => {
    return 'hello'
  }
})

api.on('error', console.log)