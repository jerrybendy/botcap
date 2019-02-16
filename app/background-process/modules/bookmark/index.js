const db = require('./db')
const ipcListener = require('./IPCListener')

module.exports = {
  onAppReady(win) {
    // Register ipc listeners
    ipcListener(win)
  }
}
