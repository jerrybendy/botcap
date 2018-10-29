<template>
  <div class="tab" :class="{active: isActive}" @click="onTabClick" @contextmenu.prevent="onContextMenu">
    <img :src="page.favicon" alt="" class="tab-favicon">
    <p class="tab-title">{{ page.title }}</p>
    <button class="tab-close" @click.stop="onClose"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" fill="#5f6368"/></svg></button>
  </div>
</template>

<script>
  import {remote} from 'electron'

  export default {
    name: "Tab",
    props: {
      page: Object,
      isActive: {
        type: Boolean,
        'default': false
      }
    },
    methods: {
      onClose() {
        this.$emit('on-close', this.page.id)
      },
      onTabClick() {
        this.$emit('on-tab-click', this.page.id)
      },
      onContextMenu() {
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
          {
            type: 'separator',
          },
          {
            label: '重新加载',
            click() {

            }
          },
          {
            label: '关闭标签页',
            click() {
              self.onClose()
            }
          }
        ])

        menu.popup({window: remote.getCurrentWindow()})
      },
    }
  }
</script>

<style scoped>

</style>