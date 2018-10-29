<template>
  <button class="op-btn" @click="onClick"
  ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M296 136c0-22.002-17.998-40-40-40s-40 17.998-40 40 17.998 40 40 40 40-17.998 40-40zm0 240c0-22.002-17.998-40-40-40s-40 17.998-40 40 17.998 40 40 40 40-17.998 40-40zm0-120c0-22.002-17.998-40-40-40s-40 17.998-40 40 17.998 40 40 40 40-17.998 40-40z" fill="#5f6368"/></svg></button>
</template>

<script>
  import {remote} from 'electron'

  export default {
    name: "MainMenuButton",
    methods: {
      onClick() {
        const webContents = remote.getCurrentWindow().webContents
        const self = this
        const menu = remote.Menu.buildFromTemplate([
          {
            label: '打开新的标签页',
            click() {
              self.$store.dispatch('ADD_NEW_PAGE', {
                srcUrl: '',
                isNavigate: true,
              })
            }
          },
        ])

        menu.popup({window: remote.getCurrentWindow()})
      }
    }
  }
</script>

<style scoped>

</style>