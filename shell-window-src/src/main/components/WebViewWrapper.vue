<template>
  <webview ref="webview" class="webview"
           :class="{active: isActive}"
           :src="page.srcUrl"
           frameborder="0"
           @did-finish-load="didFinishLoad"
           @page-title-updated="pageTitleUpdated"
           @page-favicon-updated="pageFaviconUpdated"
           @did-navigate="didNavigate"
           @did-navigate-in-page="didNavigateInPage"
           @new-window="newWindow"
           @did-start-loading="didStartLoading"
           @did-stop-loading="didStopLoading"
  ></webview>
</template>

<script>
  export default {
    name: "WebViewWrapper",
    props: {
      id: Number,
      page: Object,
      isActive: {
        type: Boolean,
        'default': false,
      }
    },
    mounted() {
      this.$root.$on('navigate', this.doNavigate)
    },
    beforeDestroy() {
      this.$root.$off('navigate', this.doNavigate)
    },
    methods: {
      doNavigate(method) {
        if (!this.isActive) {
          return
        }
        switch (method) {
          case 'BACK':
            this.$refs.webview.goBack()
            break
          case 'FORWARD':
            this.$refs.webview.goForward()
            break
          case 'REFRESH':
            this.$refs.webview.reload()
        }
      },
      didFinishLoad() {
        const webview = this.$refs.webview
        this.$store.commit('UPDATE_PAGE', {
          id: this.id,
          title: webview.getTitle(),
          url: webview.getURL(),
          isLoading: false,
        })
      },
      pageTitleUpdated(event) {
        this.$store.commit('UPDATE_PAGE', {
          id: this.id,
          title: event.title,
        })
      },
      pageFaviconUpdated(event) {
        this.$store.commit('UPDATE_PAGE', {
          id: this.id,
          favicon: event.favicons[0] || '',
        })
      },
      didNavigate(event) {
        this.$store.commit('UPDATE_PAGE', {
          id: this.id,
          url: event.url,
          canGoBack: this.$refs.webview.canGoBack(),
          canGoForward: this.$refs.webview.canGoForward(),
        })
      },
      didNavigateInPage(event) {
        if (event.isMainFrame) {
          this.$store.commit('UPDATE_PAGE', {
            id: this.id,
            url: event.url,
            canGoBack: this.$refs.webview.canGoBack(),
            canGoForward: this.$refs.webview.canGoForward(),
          })
        }
      },
      newWindow(event) {
        if (event.url === 'about:blank') return

        let isNavigate = true
        if (event.disposition === 'background-tab') {
          isNavigate = false
        }
        this.$store.dispatch('ADD_NEW_PAGE', {
          srcUrl: event.url,
          isNavigate,
        })
      },
      didStartLoading() {
        this.$store.commit('UPDATE_PAGE', {
          id: this.id,
          isLoading: true,
        })
      },
      didStopLoading() {
        this.$store.commit('UPDATE_PAGE', {
          id: this.id,
          isLoading: false,
        })
      }
    }
  }
</script>

<style>
  #webviews .webview {
    display: none;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    user-select: auto;
  }
  #webviews .webview.active {
    display: flex;
  }
</style>