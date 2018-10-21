const {app, BrowserWindow, Menu} = require('electron')

let win = null

app.on('ready', function () {
  createWindow()

  // Remove menus for windows and linux
  Menu.setApplicationMenu(null)

  win.loadURL('http://localhost:8080')

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

function createWindow() {
  win = new BrowserWindow({
    title: 'Electron Browser',
    width: 800,
    height: 600,
    resizable: true,
    backgroundColor: '#FFFFFF',
  })
}