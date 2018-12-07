const path = require('path')
const fs = require('fs')
const {app} = require('electron')

/**
 * Get downloads folder path
 * @returns {string}
 */
exports.getConfigDownloadPath = function() {
  // TODO Get path from config file when settings page is done

  // TODO check if the download path exists

  return app.getPath('downloads') + '/'
}


/**
 * Get download file path. If file exists, this method will add a number to the filename
 * @param filename
 * @returns {*}
 */
exports.getDownloadFilePath = function(filename) {
  const folder = exports.getConfigDownloadPath()
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
}

