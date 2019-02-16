
const MODULES = [
  require('./bookmark'),
  require('./download'),
]

const listeners = {
  onAppReady: [],
}

module.exports = {
  register() {

    MODULES.forEach(item => {
      if (typeof item.onAppReady === 'function') {
        listeners.onAppReady.push(item.onAppReady)
      }
    })

  },

  trigger(eventName, params) {
    if (!listeners[eventName]) {
      throw new Error('Event name is not defined')
    }

    listeners[eventName].forEach(callback => {
      callback(params)
    })
  }
}