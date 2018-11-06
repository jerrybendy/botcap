import Vue from 'vue'

const bus = new Vue()

export default {
  register() {
    Vue.prototype.messageBus = bus
  },
  getMessageBus() {
    return bus
  }
}