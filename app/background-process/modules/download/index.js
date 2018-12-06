const electron = require('electron')
const downloadHandler = require('./downloadHandler')

const {session} = electron


module.exports = {
  onAppReady(win) {

    /*
     * 收到新的下载请求时触发
     */
    session.defaultSession.on('will-download', (event, item) => {

      const savePath = downloadHandler.getDownloadFilePath(item.getFilename())

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
