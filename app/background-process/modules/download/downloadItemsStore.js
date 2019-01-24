/*
 * Cache all DownloadItem objects, these are used for cancel/pause/resume APIs
 */
const downloadItemsStore = {}

module.exports = {
  add(id, item) {
    downloadItemsStore[id] = item
  },

  get(id) {
    return downloadItemsStore[id]
  },

  remove(id) {
    delete downloadItemsStore[id]
  }
}
