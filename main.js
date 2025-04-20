const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('node:path')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
    color: '#2f3241',
    symbolColor: '#74b1be',
    height: 60},
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
  })

  win.loadFile('index.html')
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

