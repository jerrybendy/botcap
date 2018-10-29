<template>
  <div id="app">
    <tabs></tabs>
    <navigation></navigation>
    <webview-container></webview-container>
  </div>
</template>

<script>
  import Tabs from './layout/Tabs'
  import Navigation from './layout/Navigation'
  import WebviewContainer from './layout/WebviewContainer'

  export default {
    name: 'app',
    components: {
      Tabs,
      Navigation,
      WebviewContainer,
    },
    computed: {

    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    user-select: none;
  }

  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, "微软雅黑", Arial, sans-serif;
    overflow: hidden;
  }

  button {
    background: none;
    outline: none;
    border: none;
    cursor: auto;
  }

  input {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, "微软雅黑", Arial, sans-serif;
    user-select: text;
  }

</style>
