import {ipcRenderer} from 'electron'


export default {
  register() {

    /**
     * 开始下载新的资源
     */
    ipcRenderer.on('download__start-download', (event, data) => {

      console.log('download__start-download');
      console.log(data);
    })
  }
}
