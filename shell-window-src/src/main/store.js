import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pages: [
      {
        id: 0,
        title: 'Blank',
        favicon: '',
        url: 'botcap://blank',
        srcUrl: 'botcap://blank',
        isLoading: false,
        canGoBack: false,
        canGoForward: false,
      },
    ],

    currentPageId: 0,
  },
  mutations: {
    SET_CURRENT_PAGE_ID(state, id) {
      state.currentPageId = id
    },
    ADD_PAGE(state, params) {
      state.pages.push(params)
    },
    REMOVE_PAGE(state, id) {
      state.pages = state.pages.filter(item => item.id !== id)
    },
    UPDATE_PAGE(state, params) {
      const page = state.pages.find(item => item.id === params.id)
      if (page) {
        Object.assign(page, params)
      }
    }
  },
  actions: {
    ADD_NEW_PAGE(context, {srcUrl = '', isNavigate = true} = {}) {
      if (!srcUrl) srcUrl = 'botcap://blank'
      const id = Date.now()
      context.commit('ADD_PAGE', {
        id,
        title: '',
        favicon: '',
        url: srcUrl,
        srcUrl,
        isLoading: false,
        canGoBack: false,
        canGoForward: false,
      })
      if (isNavigate) {
        context.commit('SET_CURRENT_PAGE_ID', id)
      }
    },
    CLOSE_PAGE({state, commit, dispatch}, {id}) {
      // get the index of this page
      let index, len = state.pages.length
      for (let i = 0; i < len; i++) {
        if (state.pages[i].id === id) {
          index = i
          break
        }
      }
      // if this page is not the first one
      let switchToPageId,
        needCreateNewPage = false

      if (index !== 0) {
        switchToPageId = state.pages[index - 1].id
      } else {
        // if there is only one page, close this and create a new one
        if (len === 1) {
          needCreateNewPage = true
        } else {
          // else, change to the next one
          switchToPageId = state.pages[1].id
        }
      }

      // remove page
      commit('REMOVE_PAGE', id)

      // switch to new page
      if (typeof switchToPageId === 'number') {
        commit('SET_CURRENT_PAGE_ID', switchToPageId)
      }

      // create new
      if (needCreateNewPage) {
        dispatch('ADD_NEW_PAGE', {srcUrl: '', isNavigate: true})
      }
    }
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
