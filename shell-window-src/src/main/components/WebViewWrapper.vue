<template>
  <webview ref="webview" class="webview"
           :class="{active: isActive}"
           :src="page.srcUrl"
           frameborder="0"
           @did-finish-load="didFinishLoad"
           @page-title-updated="pageTitleUpdated"
           @page-favicon-updated="pageFaviconUpdated"
           @did-navigate-in-page="didNavigateInPage"
           @new-window="newWindow"
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

    },
    methods: {
      didFinishLoad() {
        const webview = this.$refs.webview
        this.$store.commit('UPDATE_PAGE', {
          id: this.id,
          title: webview.getTitle(),
          url: webview.getURL(),
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
      didNavigateInPage(event) {
        if (event.isMainFrame) {
          this.$store.commit('UPDATE_PAGE', {
            id: this.id,
            url: event.url,
          })
        }
      },
      newWindow(event) {
        let isNavigate = true
        if (event.disposition === 'background-tab') {
          isNavigate = false
        }
        this.$store.dispatch('ADD_NEW_PAGE', {
          srcUrl: event.url,
          isNavigate,
        })
        console.log(event);
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