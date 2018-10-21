<template>
  <div id="nav">
    <button-group>
      <i-button icon="md-arrow-back"></i-button>
      <i-button icon="md-arrow-forward"></i-button>
    </button-group>

    <div id="address">
      <i-input :value="currentPage.url"></i-input>
    </div>

    <i-button icon="md-menu"></i-button>
  </div>
</template>

<script>
  import {Button, ButtonGroup, Input} from 'iview'

  export default {
    name: "nav-col",
    components: {
      IButton: Button,
      ButtonGroup,
      IInput: Input,
    },
    computed: {
      currentPage() {
        return this.$store.getters.currentPage
      }
    }
  }
</script>

<style>
  #nav {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px solid #d2d2d2;
  }
  #nav .ivu-btn {
    border: none;
  }
  #nav .ivu-btn-icon-only .ivu-icon {
    font-size: 18px;
    line-height: 18px;
  }

  #address {
    flex: 1;
    margin: 0 8px;
  }
  #address input {
    font-family: monospace !important;
  }
</style>