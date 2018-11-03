import Vue from 'vue'
import {remote} from 'electron'
import App from './App.vue'
import store from './store'

const browserWindow = remote.getCurrentWindow()

Vue.config.productionTip = false

var query = new URLSearchParams(location.search)

document.body.classList.add(query.get('platform'))

browserWindow.on('enter-full-screen', function() {
  document.body.classList.add('fullscreen')
})
browserWindow.on('leave-full-screen', function() {
  document.body.classList.remove('fullscreen')
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
