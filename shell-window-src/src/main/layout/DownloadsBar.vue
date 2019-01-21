<template>
  <div id="downloads">
    <div class="download-items">
      <download-item v-for="file in downloadsList"
        :key="file.id"
        :file="file"></download-item>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import DownloadItem from '../components/DownloadItem'

  export default {
    name: 'DownloadsBar',
    components: {
      DownloadItem,
    },
    data() {
      return {}
    },
    computed: mapState({
      downloadsList: state => state.downloads.list,
    }),
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
      display: flex;
      flex: 1;
      height: 100%;
    }
  }
</style>