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
           @dom-ready.once="domReady"
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
      domReady() {
        this.$refs.webview.getWebContents().on('context-menu', this.onContextMenu)
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
      },
      onContextMenu(event, params) {
        const self = this,
          $webview = this.$refs.webview,
          editFlags = params.editFlags,
          menuItems = []

        if (params.linkURL) {
          menuItems.push({label: '在新标签页中打开链接', click() {
            self.$store.dispatch('ADD_NEW_PAGE', {srcUrl: params.linkURL, isNavigate: true,})
          }})
          menuItems.push({label: '复制链接地址', click() {clipboard.writeText(params.linkURL)}})
          menuItems.push({type: 'separator'})
        }

        if (params.hasImageContents) {
          menuItems.push({label: '在新标签页中打开图片', click() {
            self.$store.dispatch('ADD_NEW_PAGE', {srcUrl: params.srcURL, isNavigate: true,})
          }})

          menuItems.push({label: '复制图片地址', click() {clipboard.writeText(params.srcURL)}})
          menuItems.push({type: 'separator'})
        }

        if (editFlags.canCopy || editFlags.canPaste) {
          if (editFlags.canCut) menuItems.push({label: '剪切', role: 'cut'})
          if (editFlags.canCopy) menuItems.push({label: '复制', role: 'copy'})
          if (editFlags.canPaste) menuItems.push({label: '粘贴', role: 'paste'})
          if (editFlags.canSelectAll) menuItems.push({label: '选择全部', role: 'selectAll'})
          menuItems.push({type: 'separator'})
        }

        menuItems.push({label: '后退', enabled: $webview.canGoBack(), click() {$webview.goBack()}})
        menuItems.push({label: '前进', enabled: $webview.canGoForward(), click() {$webview.goForward()}})
        menuItems.push({label: '重新加载', accelerator: 'CommandOrControl+R', click() {$webview.reload()}})
        menuItems.push({type: 'separator'})

        menuItems.push({label: '查看元素', click() {$webview.inspectElement(params.x, params.y)}})

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