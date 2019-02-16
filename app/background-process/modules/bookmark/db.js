const {app} = require('electron')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const dbFilename = app.getPath('userData') + '/bookmarks.json'
const adapter = new FileSync(dbFilename)
const db = low(adapter)

db.defaults({
  bookmarks: [{
    id: '0',
    type: 'FOLDER',
    title: 'ROOT',
    createdAt: 0,
    icon: '',
    url: '',
  }]
})
  .write()



module.exports = {
  insert(item) {
    db.get('bookmarks')
      .push(item)
      .write()
  },

  update(id, props) {
    db.get('bookmarks')
      .find({id})
      .assign(props)
      .write()
  },

  remove(id) {
    db.get('bookmarks')
      .remove({id})
      .write()
  },
}
