const { BrowserWindow } = require("electron");
const path = require('path')

let win
function createWindow () {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadFile(path.resolve(__dirname, '../../renderer/pages/control/index.html'))
}

module.exports = { createWindow }
