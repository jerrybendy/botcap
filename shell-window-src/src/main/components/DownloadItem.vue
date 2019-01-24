<template>
  <div class="download-item">
    <radial-progress class="download-progress" :progress="percent" :isCompleted="isCompleted">
      <img :src="icon" class="download-file-icon" alt="">
    </radial-progress>

    <div class="download-desc">
      <p class="filename">
        <span class="name">{{ fileName }}</span><span class="ext">{{ fileExt }}</span>
      </p>
      <small>{{ downloadProcessString }}</small>
    </div>
    
    <div class="download-arrow" @click="onContextArrowClick">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#76797b" d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z"/></svg>
    </div>
  </div>
</template>

<script>
  import path from 'path'
  import {remote, ipcRenderer} from 'electron'
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

        switch (state) {
          case 'completed':
            return ''

          case 'cancelled':
            return 'Cancelled'

          case 'interrupted':
            return 'Failed'

          default:
            const downloaded = (receivedBytes / 1024 / 1024).toFixed(1)
            const total = (totalBytes / 1024 / 1024).toFixed(1)

            if (!totalBytes) {
              return `${downloaded} MB`
            }

            return `${downloaded}/${total} MB`
        }
      },

      isCompleted() {
        const state = this.file.state
        return ['completed', 'cancelled', 'interrupted'].indexOf(state) >= 0
      },
    },
    methods: {
      onContextArrowClick() {
        const self = this
        const state = this.file.state
        const isMac = PLATFORM === 'darwin'
        const menuTpl = []

        if (state === 'completed') {
          menuTpl.push({label: 'Open', click() { self.openFile() }})
          // TODO Open When Done
          menuTpl.push({type: 'separator'})
        }

        menuTpl.push({label: 'Pause', enabled: state === 'progressing' && !this.file.isPaused, click() {ipcRenderer.send('download__pause', self.file.id)}})
        menuTpl.push({label: 'Resume', enabled: this.file.canResume, click() {ipcRenderer.send('download__resume', self.file.id)}})
        menuTpl.push({
          label: isMac ? 'Show in Finder' : 'Show in Explorer',
          enabled: state === 'progressing' || state === 'completed',
          click() {self.showInFinder()}
        })
        menuTpl.push({type: 'separator'})

        menuTpl.push({label: 'Cancel', enabled: state === 'progressing', click() {ipcRenderer.send('download__cancel', self.file.id)}})

        const menu = remote.Menu.buildFromTemplate(menuTpl)
        menu.popup({window: remote.getCurrentWindow()})
      },

      openFile() {
        // TODO
      },

      showInFinder() {
        // TODO
      }
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

  @download-item-hover-bg: #f1f1f1;
  
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
      background: @download-item-hover-bg;
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

      &:empty {
        display: none;
      }
    }
  }

  .download-arrow {
    width: 24px;
    height: 24px;
    padding: 3px 5px;
    border-radius: 3px;
    transition: background .4s linear;

    &:hover {
      background: darken(@download-item-hover-bg, 10%);
    }

    &:active {
      background: darken(@download-item-hover-bg, 20%);
    }
  }
</style>