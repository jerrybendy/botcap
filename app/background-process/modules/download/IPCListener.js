const {ipcMain, dialog} = require('electron')
const {getDownloadFilePath} = require('./utils')
const memoryStore = require('../../utils/memoryStore')

module.exports = function(win) {

  /**
   * Save file, this will show a `save as` dialog to select target save path
   */
  ipcMain.on('download__save-file-as', (event, url) => {

    dialog.showSaveDialog(win, {
      defaultPath: getDownloadFilePath(url),
    }, (filename) => {
      // Save file name to store
      memoryStore.save('download__tmp-filename', filename)

      win.webContents.downloadURL(url)
    })
  })


}
