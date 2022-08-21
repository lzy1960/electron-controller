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

function play (stream) {
  console.log(stream);
  const video = document.getElementById('screen-video')
  video.srcObject = stream
  video.onloadedmetadata = () => {
    video.play()
  }
}
