<template>
  <div class="address" :class="{active: isActive}">
    <div class="security-identifier" :class="securityIdentifierClass"></div>
    <hr class="address-separate">
    <div class="address-url address-url-view" ref="addressUrlView">
      <span class="address-protocol">{{ urlPart.protocol }}</span>
      <span class="address-slash">//</span>
      <span class="address-path" v-show="urlPart.auth">{{ urlPart.auth }}</span>
      <span class="address-host">{{ urlPart.host }}</span>
      <span class="address-path">{{ urlPart.path }}</span>
    </div>
    <div class="address-url address-url-edit">
      <input type="text" class="address-input" ref="addressInput" v-model="inputValue" @keypress="onInputKeyPress" @contextmenu.prevent="onInputContextMenu">
    </div>
    <address-bookmark-btn />
  </div>
</template>

<script>
  import {remote} from 'electron'
  import AddressBookmarkBtn from './AddressBookmarkBtn'

  export default {
    name: "AddressFrame",
    components: {
      AddressBookmarkBtn,
    },
    props: {
      url: String,
    },
    data() {
      return {
        inputValue: this.url,
        isActive: false,
      }
    },
    computed: {
      currentPageId() {
        return this.$store.state.currentPageId
      },
      urlPart() {
        try {
          const _url = new URL(this.url)
          return {
            protocol: _url.protocol,
            auth: _url.username ? (_url.username + (_url.password ? ':' + _url.password : '')) + '@' : '',
            host: _url.host,
            path: _url.pathname + _url.search + _url.hash
          }
        } catch (e) {
          return {}
        }
      },
      securityIdentifierClass() {
        const protocol = this.urlPart.protocol || ''
        return {
          'is-security': protocol === 'https:'
        }
      }
    },
    mounted() {
      document.addEventListener('click', this.onDocumentClick, false)
    },
    beforeDestroy() {
      document.removeEventListener('click', this.onDocumentClick, false)
    },
    methods: {
      onInputKeyPress(event) {
        if (event.keyCode === 13) {
          if (!this.inputValue) return
          const srcUrl = (this.inputValue.indexOf('://') < 0 ? 'http://' : '') + this.inputValue

          this.$store.commit('UPDATE_PAGE', {
            id: this.currentPageId,
            srcUrl,
          })
        }
      },
      onInputContextMenu() {
        const webContents = remote.getCurrentWindow().webContents
        const menu = remote.Menu.buildFromTemplate([
          {role: 'cut', click() {webContents.cut()}},
          {role: 'copy', click() {webContents.copy()}},
          {role: 'paste', click() {webContents.pasteAndMatchStyle()}},
          {type: 'separator'},
          {role: 'selectAll', click() {webContents.selectAll()}},
        ])

        menu.popup({window: remote.getCurrentWindow()})
      },
      onDocumentClick(event) {
        let target = event.target

        while(target.tagName !== 'BODY') {
          if (target === this.$refs.addressUrlView || target === this.$refs.addressInput) {
            this.isActive = true
            break
          }
          target = target.parentNode
        }
        if (target.tagName === 'BODY') {
          this.isActive = false
        }
      },
    },
    watch: {
      url(newVal) {
        this.inputValue = newVal
      }
    }
  }
</script>

<style lang="less">
  @import '../../shared/styles/mixins';

  #nav .address {
    flex: 1;
    display: flex;
    align-items: center;
    height: 28px;
    padding: 0 10px;
    border-radius: 14px;
    border: 2px solid transparent;
    background: #f1f3f4;
    transition: background .2s linear;
    cursor: text;
  }

  #nav .address.active {
    border-color: #b3d7fd;
    background: #FFF;
    transition: none;
  }

  #nav .address:not(.active):hover {
    background: #e8eaed;
  }

  #nav .security-identifier {
    .square(16px);
    background: url(../../shared/images/shell-window-address-info.svg);
  }

  #nav .security-identifier.is-security {
    background-image: url(../../shared/images/shell-window-address-lock.svg);
  }

  #nav .address-separate {
    display: block;
    border: none;
    outline: none;
    .rectangle(1px, 16px);
    background: #9d9e9f;
    margin: 0 8px;
  }

  #nav .address-url {
    display: none;
    flex: 1;
    height: 100%;
    font-size: 14px;
    align-items: center;
  }

  #nav .address-url * {
    user-select: text;
  }

  #nav .address:not(.active) .address-url-view {
    display: flex !important;
    width: 1px;
    .text-overflow();
  }

  #nav .address.active .address-url-edit {
    display: flex !important;
  }

  #nav .address-protocol {
    color: #5f6368;
  }

  #nav .address-slash,
  #nav .address-path {
    color: #80868b;
  }

  #nav .address-host {
    color: #202124;
  }

  #nav .address-input {
    display: block;
    width: 100%;
    height: 100%;
    background: #FFF;
    font-size: 14px;
    padding: 0;
    border: none;
    outline: none;
  }
</style>