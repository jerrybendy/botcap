const electron = require('electron')
const downloadHandler = require('./downloadHandler')
const ipcListener = require('./IPCListener')
const memoryStore = require('../../utils/memoryStore')

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

      win.webContents.send('download__start-download', {
        url: item.getURL(),
        savePath: item.getSavePath(),
        filename: item.getFilename(),
        mimeType: item.getMimeType(),
        totalBytes: item.getTotalBytes(),
        receivedBytes: item.getReceivedBytes(),
        contentDisposition: item.getContentDisposition(),
        state: item.getState(),
        urlChain: item.getURLChain(),
        lastModifiedTime: item.getLastModifiedTime(),
        eTag: item.getETag(),
        startTime: item.getStartTime(),
      })

      item.on('updated', (event, state) => {
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
        if (state === 'completed') {
          console.log('Download successfully')
        } else {
          console.log(`Download failed: ${state}`)
        }
      })

    })
  }
}
