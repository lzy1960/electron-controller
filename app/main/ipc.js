const { ipcMain } = require('electron')
const { send: sendMainWindow } = require('./windows/main')
const { createWindow: createControlWindow } = require('./windows/control')

module.exports = function () {
  ipcMain.handle('login', async () => {
    //先mock，返回一个code
    let code = Math.floor(Math.random() * (999999 - 100000) + 100000)
    return code
  })
  ipcMain.handle('control', async (e, remoteCode) => {
    // 这里跟服务器交互，先mock
    sendMainWindow('control-state-change', remoteCode, 1)
    createControlWindow()
  })
}
