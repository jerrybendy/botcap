<template>
  <div class="address-bookmark-btn" :title="btnTitle">
    <i class="material-icons">star_border</i>

    <div class="address-bookmark-dialog">
      <h4>Bookmark added</h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddressBookmarkBtn",
    data() {
      return {
        btnTitle: 'Bookmark this page'
      }
    }
  }
</script>

<style lang="less">
  @import "../../shared/styles/mixins";

  .address-bookmark-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #5f6368;
    width: 32px;
    height: 24px;
    border-radius: 12px;
    transition: background .2s linear;
    transform: translateX(10px);
    cursor: auto;

    &:hover {
      background: #e1e3e4;
    }

    &:active, &.active {
      background: #d6d8d8;
    }
  }

  .address-bookmark-dialog {
    position: absolute;
    top: 24px;
    right: 0;
    width: 320px;
    height: 200px;
    border: 1px solid #aaa;
    border-radius: 4px;
    background: #fff;
    padding: 20px 16px 16px;
    .z-depth-3();

    h4 {
      font-size: 14px;
      font-weight: normal;
      color: #202124;
      margin: 0 0 22px;
    }
  }
</style>