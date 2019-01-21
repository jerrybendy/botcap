import {ipcRenderer} from 'electron'
import store from '../store'
import downloadsTypes from '../store/downloads/types'


export default {
  register() {

    /**
     * Start downloading new resource
     */
    ipcRenderer.on('download__start-download', (event, data) => {
      // Get starting download signal, add download item into list and render the downloads bar
      store.commit(downloadsTypes.ADD_ITEM, data)
      store.commit(downloadsTypes.CHANGE_BAR_VISIBILITY, true)
    })

    ipcRenderer.on('download__updated', (event, data) => {
      store.commit(downloadsTypes.UPDATE_ITEM, data)
    })
  }
}
