const {app, BrowserWindow, Menu} = require('electron')
const registerProtocols = require('./utils/registerProtocols')

let win = null

const DEV_MODE = process.argv.indexOf('--devMode') >= 0

app.on('ready', function () {
  createWindow()

  // Remove menus for windows and linux
  Menu.setApplicationMenu(null)

  if (DEV_MODE) {
    win.loadURL('http://localhost:8080/main.html?platform=' + process.platform)
    win.webContents.openDevTools()

  } else {
    win.loadURL(`file://${__dirname}/../shell-window/index.html?platform=${process.platform}`)
  }

  win.on('closed', function () {
    win = null
  })

})

app.on('active', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  app.quit()
})

registerProtocols()

function createWindow() {
  win = new BrowserWindow({
    title: 'Electron Browser',
    width: 800,
    height: 600,
    resizable: true,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#FFFFFF',
  })
}