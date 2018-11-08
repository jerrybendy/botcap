import {remote} from 'electron'
import store from '../store'
import messageBus from './messageBus'

export default {
  register() {
    const template = [
      {
        label: '文件',
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
          {type: 'separator'},
          {
            label: '关闭标签页',
            accelerator: 'CommandOrControl+W',
            click() {
              store.dispatch('CLOSE_PAGE', {id: store.state.currentPageId})
            }
          },
        ]
      },
      {role: 'editMenu'},
      {
        label: '视图',
        submenu: [
          {
            label: '重新加载',
            accelerator: 'CommandOrControl+R',
            click() {
              const bus = messageBus.getMessageBus()
              bus.$emit('navigate', 'REFRESH')
            }
          },
          {type: 'separator'},
          {role: 'togglefullscreen'},
          {type: 'separator'},
          {
            label: 'Developer',
            submenu: [
              {label: 'Reload frame', role: 'reload', accelerator: ''},
              {label: 'Force reload frame', role: 'forcereload', accelerator: ''},
              {label: 'Toggle dev tools', role: 'toggledevtools', accelerator: ''},
            ]}
        ]
      },
      {
        role: 'window',
        submenu: [
          {role: 'minimize'},
          {role: 'close'}
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click () { require('electron').shell.openExternal('https://electronjs.org') }
          }
        ]
      },
    ]

    if (remote.process.platform === 'darwin') {
      template.unshift({
        label: remote.app.getName(),
        submenu: [
          {role: 'about'},
          {type: 'separator'},
          {role: 'services', submenu: []},
          {type: 'separator'},
          {role: 'hide'},
          {role: 'hideothers'},
          {role: 'unhide'},
          {type: 'separator'},
          {role: 'quit'},
        ]
      })
    }

    remote.Menu.setApplicationMenu(remote.Menu.buildFromTemplate(template))

    // Hide menus on windows and linux
    remote.getCurrentWindow().setMenuBarVisibility(false)
  }
}

