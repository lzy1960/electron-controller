const { BrowserWindow } = require("electron");
const path = require('path')
const isDev = require('electron-is-dev')

let win
function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  if (isDev) {
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(path.resolve(__dirname, '../renderer/pages/control/index.html'))
  }
}

function send (channel, ...args) {
  win.webContents.send(channel, ...args)
}

module.exports = { createWindow, send }
