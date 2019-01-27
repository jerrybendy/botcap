<template>
  <div class="download-item" @click="openFile">
    <radial-progress class="download-progress" :progress="percent" :isCompleted="isCompleted">
      <img :src="icon" class="download-file-icon" alt="">
    </radial-progress>

    <div class="download-desc">
      <p class="filename">
        <span class="name">{{ fileName }}</span><span class="ext">{{ fileExt }}</span>
      </p>
      <small>{{ downloadProcessString }}</small>
    </div>
    
    <div class="download-arrow" @click.stop="onContextArrowClick"><i class="material-icons">expand_less</i></div>
  </div>
</template>

<script>
  import path from 'path'
  import {remote, ipcRenderer, shell} from 'electron'
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
        if (this.file.state === 'completed') shell.openItem(this.file.savePath)
      },

      showInFinder() {
        shell.showItemInFolder(this.file.savePath)
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
    flex-shrink: 0;
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

      &:empty {
        display: none;
      }
    }
  }

  .download-arrow {
    width: 24px;
    height: 24px;
    padding-top: 4px;
    font-size: 18px;
    color: #76797b;
    text-align: center;
    border-radius: 3px;
    transition: background .2s linear, border-radius .1s;

    &:hover {
      background: #edeeee;
    }

    &:active {
      border-radius: 50%;
      background: #d9dada;
    }
  }
</style>