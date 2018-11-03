const electron = require('electron')
const registerProtocols = require('./utils/registerProtocols')

const {app, BrowserWindow, Menu} = electron


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
    win.loadURL(`file://${__dirname}/../renderer/main.html?platform=${process.platform}`)
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
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({
    title: 'Electron Browser',
    width,
    height,
    resizable: true,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#FFFFFF',
  })
}