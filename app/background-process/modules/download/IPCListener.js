const {ipcMain, dialog} = require('electron')
const {getDownloadFilePath} = require('./utils')
const memoryStore = require('../../utils/memoryStore')
const downloadItemsStore = require('./downloadItemsStore')

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


  ipcMain.on('download__cancel', (event, id) => {
    const downloadItem = downloadItemsStore.get(id)
    if (!downloadItem) {
      console.log(`DownloadItem of ${id} not exists`)
      return
    }

    downloadItem.cancel()
    console.log(`Download of ${id} is canceled`)

    // TODO: Remove the file which doesn't download completed
  })


  ipcMain.on('download__pause', (event, id) => {
    const downloadItem = downloadItemsStore.get(id)
    if (!downloadItem) {
      console.log(`DownloadItem of ${id} not exists`)
      return
    }

    downloadItem.pause()
    console.log(`Download of ${id} is paused`)
  })


  ipcMain.on('download__resume', (event, id) => {
    const downloadItem = downloadItemsStore.get(id)
    if (!downloadItem) {
      console.log(`DownloadItem of ${id} not exists`)
      return
    }

    if (downloadItem.canResume()) {
      downloadItem.resume()
    }
  })
}
