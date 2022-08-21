const { BrowserWindow, desktopCapturer, ipcRenderer, ipcMain } = require("electron");
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
  win.webContents.openDevTools({ mode: 'detach' })
  win.loadFile(path.resolve(__dirname, '../../renderer/pages/control/index.html'))

  // electron 17 开始，desktopCapturer只能写在主进程中
  async function getScreenStream () {
    const sources = await desktopCapturer.getSources({
      types: ['screen']
    })
    win.webContents.send('add-stream', sources[0].id)
  }
  getScreenStream()
}

module.exports = { createWindow }
