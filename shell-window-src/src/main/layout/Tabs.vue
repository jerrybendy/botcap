<template>
  <div id="tabs">
    <div class="tab-content">
      <tab v-for="page in pages"
           :key="page.id"
           :page="page"
           :is-active="page.id === currentPageId"
           @on-close="closePage"
           @on-tab-click="onTabClick"
      ></tab>

      <button id="add-tab" class="add-tab" @click="addBlankPage"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z" fill="#5f6368"/></svg></button>
    </div>

    <windows-controls></windows-controls>
  </div>
</template>

<script>
  import Tab from '../components/Tab'
  import WindowsControls from '../components/WindowsControls'

  export default {
    name: "Tabs",
    components: {
      Tab,
      WindowsControls,
    },
    computed: {
      pages() {
        return this.$store.state.pages
      },
      currentPageId() {
        return this.$store.state.currentPageId
      }
    },
    methods: {
      addBlankPage() {
        this.$store.dispatch('ADD_NEW_PAGE', {
          srcUrl: '',
          isNavigate: true,
        })
      },
      closePage(id) {
        this.$store.dispatch('CLOSE_PAGE', {id})
      },
      onTabClick(id) {
        this.$store.commit('SET_CURRENT_PAGE_ID', id)
      }
    }
  }
</script>

<style>

  #tabs {
    position: relative;
    padding: 8px 8px 0;
    background: #dee1e6;
    -webkit-app-region: drag;
  }

  body.win32 #tabs {
    padding-right: 170px;
  }

  .darwin:not(.fullscreen) #tabs {
    padding-left: 78px;
  }

  #tabs .tab-content {
    display: flex;
    height: 35px;
  }

  #tabs .tab {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    max-width: 240px;
    background: #dee1e6;
    padding: 0 8px 0 12px;
    border-radius: 8px 8px 0 0;
    transition: background .2s linear;
    -webkit-app-region: no-drag;
  }

  #tabs .tab:not(.active):not(:hover):after {
    content: " ";
    position: absolute;
    right: 0;
    width: 1px;
    height: 20px;
    background: #a2a6ab;
    transition: background .2s linear;
  }

  #tabs .tab-favicon {
    display: block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  #tabs .tab-favicon[src=''] {
    display: none;
  }

  #tabs .tab-title {
    flex: 1;
    width: 1px;
    font-size: 12px;
    color: #5f6368;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  #tabs .tab-close {
    width: 16px;
    height: 16px;
    padding: 1px;
    border-radius: 50%;
  }

  #tabs .tab-close:hover {
    background: #e8eaed;
  }

  #tabs .tab-close svg {
    width: 14px;
    height: 14px;
  }

  #tabs .tab:hover {
    margin-left: -1px;
    padding-left: 13px;
    background: #edeff1;
  }

  #tabs .tab.active {
    margin-left: -1px;
    padding-left: 13px;
    background: #FFF;
  }

  #tabs .add-tab {
    align-self: center;
    width: 28px;
    height: 28px;
    padding: 5px;
    margin: 0 8px;
    border-radius: 50%;
    transition: background .2s linear;
    -webkit-app-region: no-drag;
  }

  #tabs .add-tab:hover {
    background: #cbced3;
  }

  #tabs .add-tab:active {
    background: #bec0c6;
  }

  #tabs .add-tab svg {
    width: 18px;
    height: 18px;
  }

</style>