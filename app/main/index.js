const { BrowserWindow, app } = require("electron");
const handleIPC = require('./ipc')
const { createWindow } = require('./windows/main')
const { createWindow: createControlWindow } = require('./windows/control')

app.whenReady().then(() => {
  createControlWindow()
  handleIPC()

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