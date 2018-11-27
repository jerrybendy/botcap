<template>
  <div class="download-item">
    
  </div>
</template>

<script>
  export default {
    name: "DownloadItem"
  }
</script>

<style lang="less">
  @import "../../shared/styles/mixins";
  
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
      background: #f1f1f1;
    }

    &:active {
      background: #e0e0e1;
    }
  }

</style>