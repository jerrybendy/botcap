const {app} = require('electron')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const dbFilename = app.getPath('userData') + '/downloads.json'
const adapter = new FileSync(dbFilename)
const db = low(adapter)

db.defaults({
  downloads: []
})
  .write()



module.exports = {
  insert(item) {
    db.get('downloads')
      .push(item)
      .write()
  },

  update(id, props) {
    db.get('downloads')
      .find({id})
      .assign(props)
      .write()
  }
}
