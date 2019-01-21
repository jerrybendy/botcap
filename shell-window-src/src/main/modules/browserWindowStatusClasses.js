import {remote} from 'electron'
import messageBus from './messageBus'

export default {
  register() {
    const browserWindow = remote.getCurrentWindow(),
      bus = messageBus.getMessageBus(),
      bodyClasses = document.body.classList

    /*
     * Add classes for `body` element to show current global status
     */
    // Platform
    bodyClasses.add(PLATFORM)

    // Full screen or not, for MacOS
    if (browserWindow.isFullScreen()) bodyClasses.add('fullscreen')
    browserWindow.on('enter-full-screen', function() {bodyClasses.add('fullscreen')})
    browserWindow.on('leave-full-screen', function() {bodyClasses.remove('fullscreen')})

    // Maximized or not, for Windows
    if (browserWindow.isMaximized()) bodyClasses.add('maximized')
    browserWindow.on('maximize', function () {bodyClasses.add('maximized')})
    browserWindow.on('unmaximize', function () {bodyClasses.remove('maximized')})

  }
}
