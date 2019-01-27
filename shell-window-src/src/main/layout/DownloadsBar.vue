<template>
  <div id="downloads">
    <div class="download-items">
      <download-item v-for="file in downloadsList"
        :key="file.id"
        :file="file"></download-item>
    </div>

    <div class="download-close" @click="hideDownloads"><i class="material-icons">close</i></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import DownloadItem from '../components/DownloadItem'
  import downloadsTypes from '../store/downloads/types'

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
    methods: {
      hideDownloads() {
        this.$store.commit(downloadsTypes.CHANGE_BAR_VISIBILITY, false)
      },
    }
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
    padding-right: 6px;

    .download-items {
      display: flex;
      flex: 1;
      width: 1px;
      height: 100%;
      overflow: hidden;
    }

    .download-close {
      width: 24px;
      height: 24px;
      border-radius: 3px;
      font-size: 16px;
      color: #76797b;
      text-align: center;
      padding-top: 4px;
      margin-left: 6px;
      transition: background .2s linear, border-radius .1s;

      &:hover {
        background: #edeeee;
      }

      &:active {
        border-radius: 50%;
        background: #d9dada;
      }
    }
  }
</style>