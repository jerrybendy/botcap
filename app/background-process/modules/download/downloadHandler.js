const path = require('path')
const fs = require('fs')
const {app} = require('electron')

module.exports = {
  download(url, saveTo) {
    console.log(url);
  },

  /**
   * Get download file path. If file exists, this method will add a number to the filename
   * @param filename
   * @returns {*}
   */
  getDownloadFilePath(filename) {
    const folder = this.getDownloadPath()
    const {name, ext} = path.parse(filename)
    let targetName = name

    if (fs.existsSync(folder + targetName + ext)) {
      for (let i = 1;; i++) {
        targetName = name + '(' + i + ')'
        if (!fs.existsSync(folder + targetName + ext)) {
          break
        }
      }
    }

    return folder + targetName + ext
  },

  /**
   * Get downloads folder path
   * @returns {string}
   */
  getDownloadPath() {
    // TODO Get path from config file when settings page is done
    return app.getPath('downloads') + '/'
  },
}
