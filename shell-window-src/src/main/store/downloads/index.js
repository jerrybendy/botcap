import types from './types'

export default {
  state: {
    list: [],  // downloads list
    isShowDownloadsBar: false,
  },

  mutations: {
    [types.ADD_ITEM] (state, item) {
      state.list.unshift(item)
      // Keep downloads list not greater than 10 items
      if (state.list.length > 10) {
        state.list.pop()
      }
    },

    [types.CHANGE_BAR_VISIBILITY] (state, isShow) {
      state.isShowDownloadsBar = isShow
    },

    [types.UPDATE_ITEM] (state, item) {
      const id = item.id
      state.list = state.list.map(i => i.id === id ? item : i)
    }
  },

  actions: {

  },
}
