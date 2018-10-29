<template>
  <div id="webviews">
    <web-view-wrapper
      v-for="page in pages"
      :key="page.id"
      :id="page.id"
      :page="page"
      :is-active="page.id === currentPageId"
      ></web-view-wrapper>
  </div>
</template>

<script>
  import WebViewWrapper from '../components/WebViewWrapper'

  export default {
    name: "WebviewContainer",
    components: {
      WebViewWrapper,
    },
    computed: {
      pages() {
        return this.$store.state.pages
      },
      currentPageId() {
        return this.$store.state.currentPageId
      }
    },
  }
</script>

<style>
  #webviews {
    height: calc(100vh - 80px);
  }


</style>