<template>
  <div id="tabs">
    <tabs type="card" v-model="currentPageId" closable>
      <tab-pane v-for="item in pages"
                :key="item.id"
                :name="item.id"
                :label="item.title"></tab-pane>
    </tabs>
  </div>
</template>

<script>

  import {Tabs, TabPane} from 'iview'

  export default {
    name: "tabs-col",
    components: {
      Tabs,
      TabPane,
    },
    computed: {
      pages() {
        return this.$store.state.pages
      },
      currentPageId: {
        get() {
          return this.$store.state.currentPageId
        },
        set(id) {
          this.$store.commit('SET_CURRENT_PAGE_ID', id)
        }
      }
    }
  }
</script>

<style>
  #tabs {
    margin-bottom: -16px;
  }
  #tabs .ivu-tabs-content {
    display: none;
  }
</style>