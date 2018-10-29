<template>
  <div class="tab" :class="{active: isActive}" @click="onTabClick">
    <img :src="page.favicon" alt="" class="tab-favicon">
    <p class="tab-title">{{ page.title }}</p>
    <button class="tab-close" @click.stop="onClose"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" fill="#5f6368"/></svg></button>
  </div>
</template>

<script>
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
      }
    }
  }
</script>

<style scoped>

</style>