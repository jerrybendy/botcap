/**
 * This file is used to save some KV values in memory, just for some temp usage
 */

const store = {}

module.exports = {

  save(key, value) {
    store[key] = value
  },

  get(key) {
    return store[key]
  },

  getAndRemove(key) {
    const value = store[key]
    delete store[key]
    return value
  }
}
