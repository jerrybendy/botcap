<template>
  <div id="app" :class="appClass">
    <tabs></tabs>
    <navigation></navigation>
    <webview-container></webview-container>
    <downloads-bar></downloads-bar>
  </div>
</template>

<script>
  import Tabs from './layout/Tabs'
  import Navigation from './layout/Navigation'
  import WebviewContainer from './layout/WebviewContainer'
  import DownloadsBar from './layout/DownloadsBar'

  export default {
    name: 'app',
    components: {
      Tabs,
      Navigation,
      WebviewContainer,
      DownloadsBar,
    },
    computed: {
      appClass() {
        return {
          'show-downloads': this.$store.state.downloads.isShowDownloadsBar
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../shared/styles/variables';
  @import '../shared/styles/materialIcons';

  * {
    box-sizing: border-box;
    user-select: none;
  }

  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: @common-font-family;
    overflow: hidden;
  }

  button {
    background: none;
    outline: none;
    border: none;
    cursor: auto;
  }

  input {
    font-family: @common-font-family;
    user-select: text;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
