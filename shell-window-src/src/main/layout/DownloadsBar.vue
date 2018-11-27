<template>
  <div id="downloads">
    <div class="download-items">
      <download-item></download-item>
    </div>
  </div>
</template>

<script>
  import DownloadItem from '../components/DownloadItem'

  export default {
    name: 'DownloadsBar',
    components: {
      DownloadItem,
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="less">
  @import "../../shared/styles/variables";

  #downloads {
    display: flex;
    align-items: center;
    height: @renderer__downloads-height;
    border-top: 1px solid #b6b4b6;
    padding-left: 4px;

    .download-items {
      flex: 1;
      height: 100%;
    }
  }
</style>