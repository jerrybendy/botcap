import Vue from 'vue'
import App from './App.vue'
import store from './store'
import browserWindowStatusClasses from './modules/browserWindowStatusClasses'
import mainMenu from './modules/mainMenu'
import messageBus from './modules/messageBus'
import download from './modules/download'

Vue.config.productionTip = false

// Add global variables
const query = new URLSearchParams(location.search)
window.PLATFORM = query.get('platform')

// register modules
messageBus.register()  // Message bus is a requirement for other modules, so it MUST be the first module
browserWindowStatusClasses.register()
mainMenu.register()
download.register()


new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
