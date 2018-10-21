<template>
  <div id="app">
    <tabs-col></tabs-col>
    <nav-col></nav-col>
    <webviews-col></webviews-col>

  </div>
</template>

<script>
  import TabsCol from './components/TabsCol'
  import NavCol from './components/NavCol'
  import WebviewsCol from './components/WebviewsCol'

  export default {
    name: 'app',
    components: {
      TabsCol,
      NavCol,
      WebviewsCol,
    }
  }
</script>

<style>
  html, body, #app {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  #app {
    display: flex;
    flex-direction: column;
  }
</style>
