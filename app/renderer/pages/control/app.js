const { ipcRenderer } = require('electron')

ipcRenderer.on('add-stream', async (event, sourceId) => {
  console.log(sourceId);
  console.log('play stream')

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: sourceId,
        maxWidth: window.screen.width,
        maxHeight: window.screen.height
      }
    }
  })
  play(stream)
})

const video = document.getElementById('screen-video')
function play (stream) {
  console.log(stream);
  video.srcObject = stream
  video.onloadedmetadata = () => {
    video.play()
  }
}

window.onkeydown = function (e) {
  let data = {
    keyCode: e.keyCode,
    shift: e.shiftKey,
    meta: e.metaKey,
    control: e.ctrlKey,
    alt: e.altKey
  }
  setTimeout(() => {
    ipcRenderer.send('robot', 'key', data)
  }, 2000);
}

window.onmouseup = function (e) {
  let data = {}
  data.clientX = e.clientX
  data.clientY = e.clientY
  data.video = {
    width: video.getBoundingClientRect().width,
    height: video.getBoundingClientRect().height
  }
  data.screen = {
    width: window.screen.width,
    height: window.screen.height
  }
  ipcRenderer.send('robot', 'mouse', data)
}
