<template>
  <div class="download-item">
    <radial-progress class="download-progress" :progress="percent">
      <img :src="icon" class="download-file-icon" alt="">
    </radial-progress>

    <div class="download-desc">
      <p class="filename">
        <span class="name">{{ fileName }}</span><span class="ext">{{ fileExt }}</span>
      </p>
      <small>{{ downloadProcessString }}</small>
    </div>
  </div>
</template>

<script>
  import path from 'path'
  import {remote} from 'electron'
  import RadialProgress from './RadialProgress'

  export default {
    name: "DownloadItem",
    props: {
      file: {
        type: Object,
        'default': () => {return {}}
      }
    },
    components: {
      RadialProgress,
    },
    data() {
      return {
        icon: '',
        fileName: '',
        fileExt: '',
      }
    },
    created() {

    },
    computed: {
      percent() {
        if (!this.file.totalBytes) return 0
        var p = Math.ceil(this.file.receivedBytes / this.file.totalBytes * 100)
        console.log(p);
        return p
      },

      downloadProcessString() {
        const { receivedBytes, totalBytes, state } = this.file

        if (state === 'completed') return 'Completed'
        // TODO Error status

        if (!totalBytes) return 'Downloading...'

        const downloaded = (receivedBytes / 1024).toFixed(1)
        const total = (totalBytes / 1024).toFixed(1)
        return `${downloaded}/${total} MB`
      },
    },
    watch: {
      'file.filename': {
        handler(filename) {
          const self = this

          remote.app.getFileIcon(filename, {size: 'normal'}, function(error, icon) {
            if (icon) {
              self.icon = icon.toDataURL()
            }
          })
        },
        immediate: true
      },

      'file.savePath': {
        handler(savePath) {
          const parsed = path.parse(savePath)
          this.fileName = parsed.name
          this.fileExt = parsed.ext
        },
        immediate: true
      }
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

  .download-desc {
    display: flex;
    flex-direction: column;
    justify-content: center;

    flex: 1;
    width: 1px;
    height: 100%;

    .filename {
      display: flex;
      font-size: 12px;
      color: #5f6368;
      line-height: 1;
      margin: 0;

      .name, .ext {
        display: inline;
        .text-overflow();
      }
    }

    small {
      font-size: 10px;
      color: #828589;
      line-height: 1;
      margin-top: 4px;
    }
  }

</style>