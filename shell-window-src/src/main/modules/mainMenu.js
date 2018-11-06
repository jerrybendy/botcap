import {remote} from 'electron'
import store from '../store'
import messageBus from './messageBus'

export default {
  register() {
    const menu = remote.Menu.buildFromTemplate( [
      {
        label: '标签页',
        submenu: [
          {
            label: '打开新的标签页',
            accelerator: 'CommandOrControl+N',
            click() {
              store.dispatch('ADD_NEW_PAGE', {
                srcUrl: '',
                isNavigate: true,
              })
            }
          },
          {
            label: '重新加载',
            accelerator: 'CommandOrControl+R',
            click() {
              const bus = messageBus.getMessageBus()
              bus.$emit('navigate', 'REFRESH')
            }
          },
          {
            label: '关闭标签页',
            accelerator: 'CommandOrControl+W',
            click() {
              store.dispatch('CLOSE_PAGE', {id: store.state.currentPageId})
            }
          },
        ]
      }
    ])

    remote.Menu.setApplicationMenu(menu)
  }
}

