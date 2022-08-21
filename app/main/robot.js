const { ipcMain } = require("electron")
const robot = require('robotjs')
const vkey = require('vkey')

module.exports = function () {
  ipcMain.on('robot', (e, type, data) => {
    if (type === 'mouse') {
      handleMouse(data)
    } else if (type === 'key') {
      handleKey(data)
    }
  })
}

function handleKey (data) {
  // data {keyCode, meta, alt, ctrl, shift}
  const { keyCode, meta, shift, alt, ctrl } = data
  const modifiers = []
  if (meta) modifiers.push('meta')
  if (shift) modifiers.push('shift')
  if (alt) modifiers.push('alt')
  if (ctrl) modifiers.push('ctrl')
  let key = vkey[keyCode].toLowerCase()
  if (key[0] !== '<') {
    console.log(key);
    robot.keyTap(key, modifiers)
  }
}

function handleMouse (data) {
  // data {clientX, clientY, screen: {width, height}, video: {width, height}}
  // 等比例缩放
  const { clientX, clientY, screen, video } = data
  let x = clientX * screen.width / video.width
  let y = clientY * screen.height / video.height
  robot.moveMouse(x, y)
  robot.mouseClick()
}