const { BrowserWindow, app } = require("electron");
const path = require('path')
const isDev = require('electron-is-dev')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  if (isDev) {
    win.loadURL('http://localhost:3000')
    // win.webContents.openDevTools()
  } else {
    win.loadFile(path.resolve(__dirname, '../renderer/pages/control/index.html'))
  }
  // win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})