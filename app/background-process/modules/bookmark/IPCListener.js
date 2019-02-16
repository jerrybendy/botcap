const {ipcMain} = require('electron')
const db = require('./db')

module.exports = function(win) {
  /**
   * Add a new bookmark
   */
  ipcMain.on('bookmark__add-new', (event, bookmark) => {
    db.insert(bookmark)
  })


  ipcMain.on('bookmark__remove', (event, bookmarkId) => {

  })

}
