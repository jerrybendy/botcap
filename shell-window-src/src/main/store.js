import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pages: [
      {
        id: 'xxxxx',
        title: 'Beaker',
        favicon: 'https://beakerbrowser.com/img/favicon.png',
        url: 'https://beakerbrowser.com/install/',
      },
      {
        id: 'yyy',
        title: 'Vuex',
        favicon: 'https://beakerbrowser.com/img/favicon.png',
        url: 'https://vuex.vuejs.org/guide/getters.html',
      },
    ],

    currentPageId: 'xxxxx',
  },
  mutations: {
    SET_CURRENT_PAGE_ID(state, id) {
      state.currentPageId = id
    }
  },
  actions: {

  },
  getters: {
    currentPage(state) {
      const pages = state.pages.filter(item => item.id === state.currentPageId)
      if (!pages.length) {
        return {}
      }
      return pages[0]
    }
  }
})
