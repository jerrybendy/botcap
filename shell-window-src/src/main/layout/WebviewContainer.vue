<template>
  <div id="webviews">
    <web-view-wrapper
      v-for="page in pages"
      :key="page.id"
      :id="page.id"
      :page="page"
      :is-active="page.id === currentPageId"
      ></web-view-wrapper>

    <div class="target-url" v-show="targetUrl">{{ targetUrl }}</div>
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
      },
      targetUrl() {
        return this.$store.state.targetUrl
      }
    },
  }
</script>

<style>
  #webviews {
    position: relative;
    height: calc(100vh - 80px);
  }

  #webviews .target-url {
    position: absolute;
    left: 0;
    bottom: 0;
    max-width: 80vw;
    padding: 3px 40px 3px 3px;
    color: #717375;
    font-size: 12px;
    border-radius: 0 4px 0 0;
    border: 1px solid #a1a1a1;
    box-shadow: 0 2px 7px 0 rgba(0,0,0,0.4);
    z-index: 999;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }


</style>