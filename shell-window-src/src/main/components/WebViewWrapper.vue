<template>
  <webview ref="webview" class="webview"
           :class="{active: isActive}"
           :src="page.srcUrl"
           frameborder="0"
           @load-commit="loadCommit"
           @did-finish-load="didFinishLoad"
           @did-fail-load="didFailLoad"
           @did-frame-finish-load="didFrameFinishLoad"
           @did-start-loading="didStartLoading"
           @did-stop-loading="didStopLoading"
           @dom-ready.once="domReady"
           @page-title-updated="pageTitleUpdated"
           @page-favicon-updated="pageFaviconUpdated"
           @enter-html-full-screen="enterHtmlFullScreen"
           @leave-html-full-screen="leaveHtmlFullScreen"
           @console-message="consoleMessage"
           @found-in-page="foundInPage"
           @new-window="newWindow"
           @will-navigate="willNavigate"
           @did-navigate="didNavigate"
           @did-navigate-in-page="didNavigateInPage"
           @close="close"
           @ipc-message="ipcMessage"
           @crashed="crashed"
           @gpu-crashed="gpuCrashed"
           @plugin-crashed="pluginCrashed"
           @destroyed="destroyed"
           @media-started-playing="mediaStartedPlaying"
           @media-paused="mediaPaused"
           @did-change-theme-color="didChangeThemeColor"
           @update-target-url="updateTargetUrl"
  ></webview>
</template>

<script>
  import {remote, clipboard} from 'electron'

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
      this.messageBus.$on('navigate', this.doNavigate)
    },
    beforeDestroy() {
      this.messageBus.$off('navigate', this.doNavigate)
    },
    methods: {
      loadCommit(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('loadCommit', event)
      },
      didFinishLoad(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('didFinishLoad', event)
        const webview = this.$refs.webview
        this.$store.commit('UPDATE_PAGE', {
          id: this.id,
          title: webview.getTitle(),
          url: webview.getURL(),
          isLoading: false,
        })
      },
      didFailLoad(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('didFailLoad', event)
      },
      didFrameFinishLoad(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('didFrameFinishLoad', event)
      },
      didStartLoading(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('didStartLoading', event)
        this.$store.commit('UPDATE_PAGE', {
          id: this.id,
          isLoading: true,
        })
      },
      didStopLoading(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('didStopLoading', event)
        this.$store.commit('UPDATE_PAGE', {
          id: this.id,
          isLoading: false,
        })
      },
      domReady(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('domReady', event)
        this.$refs.webview.getWebContents().on('context-menu', this.onContextMenu)
      },
      pageTitleUpdated(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('pageTitleUpdated', event)
        this.$store.commit('UPDATE_PAGE', {
          id: this.id,
          title: event.title,
        })
      },
      pageFaviconUpdated(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('pageFaviconUpdated', event)
        this.$store.commit('UPDATE_PAGE', {
          id: this.id,
          favicon: event.favicons[0] || '',
        })
      },
      enterHtmlFullScreen() {
        if (process.env.NODE_ENV !== 'production') console.debug('pageFaviconUpdated')
      },
      leaveHtmlFullScreen() {
        if (process.env.NODE_ENV !== 'production') console.debug('leaveHtmlFullScreen')
      },
      consoleMessage(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('consoleMessage', event)
      },
      foundInPage(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('foundInPage', event)
      },
      newWindow(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('newWindow', event)
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
      willNavigate(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('willNavigate', event)
      },
      didNavigate(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('didNavigate', event)
        this.$store.commit('UPDATE_PAGE', {
          id: this.id,
          url: event.url,
          canGoBack: this.$refs.webview.canGoBack(),
          canGoForward: this.$refs.webview.canGoForward(),
        })
      },
      didNavigateInPage(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('didNavigateInPage', event)
        if (event.isMainFrame) {
          this.$store.commit('UPDATE_PAGE', {
            id: this.id,
            url: event.url,
            canGoBack: this.$refs.webview.canGoBack(),
            canGoForward: this.$refs.webview.canGoForward(),
          })
        }
      },
      close() {
        if (process.env.NODE_ENV !== 'production') console.debug('close')
      },
      ipcMessage(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('ipcMessage', event)
      },
      crashed () {
        if (process.env.NODE_ENV !== 'production') console.debug('crashed')
      },
      gpuCrashed () {
        if (process.env.NODE_ENV !== 'production') console.debug('gpuCrashed')
      },
      pluginCrashed () {
        if (process.env.NODE_ENV !== 'production') console.debug('pluginCrashed')
      },
      destroyed () {
        if (process.env.NODE_ENV !== 'production') console.debug('destroyed')
      },
      mediaStartedPlaying () {
        if (process.env.NODE_ENV !== 'production') console.debug('mediaStartedPlaying')
      },
      mediaPaused () {
        if (process.env.NODE_ENV !== 'production') console.debug('mediaPaused')
      },
      didChangeThemeColor (event) {
        if (process.env.NODE_ENV !== 'production') console.debug('didChangeThemeColor', event)
      },
      updateTargetUrl(event) {
        if (process.env.NODE_ENV !== 'production') console.debug('updateTargetUrl', event.url)
      },

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
      onContextMenu(event, params) {
        const self = this,
          isMac = PLATFORM === 'darwin',
          $webview = this.$refs.webview,
          editFlags = params.editFlags,
          menuItems = []

        if (params.linkURL) {
          menuItems.push({label: 'Open Link in New Tab', click() {
            self.$store.dispatch('ADD_NEW_PAGE', {srcUrl: params.linkURL, isNavigate: true,})
          }})
          menuItems.push({label: 'Copy Link Address', click() {clipboard.writeText(params.linkURL)}})
          menuItems.push({type: 'separator'})
        }

        if (params.hasImageContents) {
          menuItems.push({label: 'Open Image in New Tab', click() {
            self.$store.dispatch('ADD_NEW_PAGE', {srcUrl: params.srcURL, isNavigate: true,})
          }})

          menuItems.push({label: 'Copy Image Address', click() {clipboard.writeText(params.srcURL)}})
          menuItems.push({type: 'separator'})
        }

        if (editFlags.canCopy || editFlags.canPaste) {
          if (editFlags.canCut) menuItems.push({role: 'cut'})
          if (editFlags.canCopy) menuItems.push({role: 'copy'})
          if (editFlags.canPaste) menuItems.push({role: 'paste'})
          if (editFlags.canSelectAll) menuItems.push({role: 'selectAll'})
          menuItems.push({type: 'separator'})
        }

        menuItems.push({label: 'Back', enabled: $webview.canGoBack(), click() {$webview.goBack()}})
        menuItems.push({label: 'Forward', enabled: $webview.canGoForward(), click() {$webview.goForward()}})
        menuItems.push({label: 'Reload', accelerator: isMac ? 'CommandOrControl+R' : 'F5', click() {$webview.reload()}})
        menuItems.push({type: 'separator'})

        menuItems.push({label: 'Inspect', click() {$webview.inspectElement(params.x, params.y)}})

        const menu = remote.Menu.buildFromTemplate(menuItems)
        menu.popup({window: remote.getCurrentWindow()})
      },
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