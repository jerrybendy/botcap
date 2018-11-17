<template>
  <div class="windows-controls">
    <button class="min" title="最小化" @click="min">&#xE921;</button>
    <button class="max" title="最大化" @click="max">&#xE922;</button>
    <button class="unmax" title="还原" @click="unmax">&#xE923;</button>
    <button class="close" title="关闭" @click="close">&#xE8BB;</button>
  </div>
</template>

<script>
  import {remote} from 'electron'

  export default {
    name: "WindowsControls",
    methods: {
      min() {
        remote.getCurrentWindow().minimize()
      },
      max() {
        remote.getCurrentWindow().maximize()
      },
      unmax() {
        remote.getCurrentWindow().unmaximize()
      },
      close() {
        remote.getCurrentWindow().close()
      }
    }
  }
</script>

<style>
  .windows-controls {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    height: 30px;
    -webkit-app-region: no-drag;
  }

  /* Only show in windows */
  body.win32 .windows-controls {
    display: block;
  }

  .windows-controls .unmax {
    display: none;
  }

  body.maximized .windows-controls .max {
    display: none;
  }
  body.maximized .windows-controls .unmax {
    display: inline-block;
  }

  .windows-controls button {
    width: 46px;
    height: 30px;
    font-family: 'Segoe MDL2 Assets';
    font-size: 10px;
    color: #000;
    background: transparent;
    -webkit-appearance: none;
  }

  .windows-controls button:hover {
    background: #c7cacf;
  }
  .windows-controls button:active {
    background: #b2b4b8;
  }

  .windows-controls .close:hover {
    background: #e81123;
    color: #FFF;
  }
  .windows-controls .close:active {
    background: #e36571;
    color: #FFF;
  }
</style>