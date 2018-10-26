<template>
  <div id="tabs">
    <div class="tab-content">
      <div class="tab active">
        <img src="https://file.iviewui.com/file/favicon.ico" alt="" class="tab-favicon">
        <p class="tab-title">标签页 Tabs - View</p>
        <button class="tab-close" data-id="1234"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" fill="#5f6368"/></svg></button>
      </div>

      <button id="add-tab" class="add-tab"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z" fill="#5f6368"/></svg></button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Tabs"
    }
</script>

<style>

  #tabs {
    padding: 8px 8px 0;
    background: #dee1e6;
  }

  .darwin #tabs {
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