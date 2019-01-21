const electron = require('electron')
const shortId = require('shortid')
const downloadHandler = require('./downloadHandler')
const ipcListener = require('./IPCListener')
const memoryStore = require('../../utils/memoryStore')
const {getDownloadItemInfo} = require('./utils')
const db = require('./db')

const {session} = electron


module.exports = {
  onAppReady(win) {

    win.setSheetOffset(80)


    // Register ipc listeners
    ipcListener(win)

    /*
     * TODO Rewrite download path
     */

    /*
     * Will be triggered when get a new download request
     */
    session.defaultSession.on('will-download', (event, item) => {

      // Try to get savePath from memory store
      let savePath = memoryStore.getAndRemove('download__tmp-filename')

      if (!savePath) {
        savePath = downloadHandler.getDownloadFilePath(item.getFilename())
      }

      item.setSavePath(savePath)

      const id = shortId.generate()

      const downloadItemInfo = Object.assign(getDownloadItemInfo(item), {id})

      win.webContents.send('download__start-download', downloadItemInfo)

      db.insert(downloadItemInfo)

      item.on('updated', (event, state) => {
        const _data = Object.assign(getDownloadItemInfo(item), {id, state})
        db.update(id, _data)

        win.webContents.send('download__updated', _data)

        if (state === 'interrupted') {
          console.log('Download is interrupted but can be resumed')
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            console.log('Download is paused')
          } else {
            console.log(`Received bytes: ${item.getReceivedBytes()}`)
          }
        }
      })

      item.once('done', (event, state) => {
        const _data = Object.assign(getDownloadItemInfo(item), {id, state})
        db.update(id, _data)

        win.webContents.send('download__updated', _data)

        if (state === 'completed') {
          console.log('Download successfully')
        } else {
          console.log(`Download failed: ${state}`)
        }
      })

    })
  }
}
