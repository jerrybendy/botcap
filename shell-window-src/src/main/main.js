import Vue from 'vue'
import {remote} from 'electron'
import App from './App.vue'
import store from './store'
import mainMenu from './modules/mainMenu'
import messageBus from './modules/messageBus'

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

// register modules
messageBus.register()
mainMenu.register()


new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
