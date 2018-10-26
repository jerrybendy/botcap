<template>
  <div id="webviews">
    <!--<webview class="webview" src="http://www.baidu.com" frameborder="0"></webview>-->
  </div>
</template>

<script>
    export default {
        name: "WebviewContainer"
    }
</script>

<style>
  #webviews {
    height: calc(100vh - 80px);
  }

  #webviews .webview {
    display: flex;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
</style>