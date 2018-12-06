<template>
  <div class="download-item">
    <radial-progress class="download-progress" :progress="60">
      <img :src="icon" class="download-file-icon" alt="">
    </radial-progress>


  </div>
</template>

<script>
  import {remote} from 'electron'
  import RadialProgress from './RadialProgress'

  export default {
    name: "DownloadItem",
    components: {
      RadialProgress,
    },
    data() {
      return {
        icon: '',
      }
    },
    created() {
      const self = this
      remote.app.getFileIcon('/abc.exe222', {size: 'normal'}, function(error, icon) {
        if (icon) {
          self.icon = icon.toDataURL()

        }
      })
    }
  }
</script>

<style lang="less">
  @import "../../shared/styles/mixins";
  
  .download-item {
    position: relative;
    display: flex;
    align-items: center;
    .rectangle(227px, 100%);
    padding: 0 10px;
    border-radius: 3px;
    transition: background .4s linear;
    
    &:after {
      position: absolute;
      content: " ";
      right: 0;
      top: 6px;
      bottom: 6px;
      width: 1px;
      background: #C7C8C9;
    }

    &:hover {
      background: #f1f1f1;
    }

    &:active {
      background: #e0e0e1;
    }
  }

  .download-progress {
    margin-right: 8px;
  }

  .download-file-icon {
    display: block;
    width: 16px;
    height: 16px;
  }

</style>