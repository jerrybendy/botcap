import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

var query = new URLSearchParams(location.search)

document.body.classList.add(query.get('platform'))

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
