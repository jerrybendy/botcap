import {remote} from 'electron'

export default {
  register() {
    const browserWindow = remote.getCurrentWindow()

    /*
     * Add classes for `body` element to show current global status
     */
    // Platform
    document.body.classList.add(PLATFORM)

    // Full screen or not, for MacOS
    if (browserWindow.isFullScreen()) document.body.classList.add('fullscreen')
    browserWindow.on('enter-full-screen', function() {document.body.classList.add('fullscreen')})
    browserWindow.on('leave-full-screen', function() {document.body.classList.remove('fullscreen')})

    // Maximized or not, for Windows
    if (browserWindow.isMaximized()) document.body.classList.add('maximized')
    browserWindow.on('maximize', function () {document.body.classList.add('maximized')})
    browserWindow.on('unmaximize', function () {document.body.classList.remove('maximized')})

  }
}
