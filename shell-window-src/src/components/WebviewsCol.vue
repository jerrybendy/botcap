<template>
  <div id="webviews">
    <webview
      v-for="item in pages"
      :key="item.id"
      :class="{hidden: item.id !== currentPageId}"
      :src="item.url"></webview>
  </div>
</template>

<script>
  export default {
    name: "webviews-col",
    computed: {
      pages() {
        return this.$store.state.pages
      },
      currentPageId() {
        return this.$store.state.currentPageId
      }
    }
  }
</script>

<style>
  #webviews {
    flex: 1;
  }
  #webviews webview,
  #webviews iframe {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    z-index: 2;
  }
  #webviews webview.hidden,
  #webviews iframe.hidden {
    z-index: 1;
    display: none;
  }
</style>