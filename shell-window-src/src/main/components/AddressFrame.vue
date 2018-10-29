<template>
  <div class="address active">
    <div class="security-identifier is-security"></div>
    <hr class="address-separate">
    <div class="address-url address-url-view">
      <span class="address-protocol">https</span>
      <span class="address-slash">://</span>
      <span class="address-host">www.baidu.com</span>
      <span class="address-path">/jerrybendy/iw-player/blob/master/package.json</span>
    </div>
    <div class="address-url address-url-edit">
      <input type="text" class="address-input" v-model="inputValue" @keypress="onInputKeyPress" @contextmenu.prevent="onInputContextMenu">
    </div>
  </div>
</template>

<script>
  import {remote} from 'electron'

  export default {
    name: "AddressFrame",
    props: {
      url: String,
    },
    data() {
      return {
        inputValue: this.url,
      }
    },
    computed: {
      currentPageId() {
        return this.$store.state.currentPageId
      }
    },
    methods: {
      onInputKeyPress(event) {
        console.log(event);
        if (event.keyCode === 13) {
          this.$store.commit('UPDATE_PAGE', {
            id: this.currentPageId,
            srcUrl: this.inputValue,
          })
        }
      },
      onInputContextMenu() {
        const webContents = remote.getCurrentWindow().webContents
        const menu = remote.Menu.buildFromTemplate([
          {label: '剪切', click() {webContents.cut()}},
          {label: '复制', click() {webContents.copy()}},
          {label: '粘贴', click() {webContents.pasteAndMatchStyle()}},
          {type: 'separator'},
          {label: '选择全部', click() {webContents.selectAll()}},
        ])

        menu.popup({window: remote.getCurrentWindow()})
      },
    },
    watch: {
      url(newVal) {
        this.inputValue = newVal
      }
    }
  }
</script>

<style>

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
    width: 16px;
    height: 16px;
    background: url(../../shared/images/shell-window-address-info.svg);
  }

  #nav .security-identifier.is-security {
    background-image: url(../../shared/images/shell-window-address-lock.svg);
  }

  #nav .address-separate {
    display: block;
    border: none;
    outline: none;
    width: 1px;
    height: 16px;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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