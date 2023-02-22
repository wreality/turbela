import type { PortInfo } from '@serialport/bindings-cpp'
import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import { initialize, enable } from '@electron/remote/main'
import path from 'path'
import os from 'os'
import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'

initialize()

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    )
  }
} catch (_) {}

let mainWindow: BrowserWindow | null

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1700,
    height: 800,
    useContentSize: true,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(
        __dirname,
        process.env.QUASAR_ELECTRON_PRELOAD ?? ''
      ),
      sandbox: false,
    },
  })
  enable(mainWindow.webContents)
  mainWindow.loadURL(process.env.APP_URL ?? '')

  if (process.env.DEBUGGING) {
    //mainWindow.maximize()
    // if on DEV or Production with debug enabled
    //mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
    handleEndSerial()
  })
}

app
  .whenReady()
  .then(() => {
    ipcMain.handle('getSerialOptions', handleGetSerialOptions)
    ipcMain.handle('startSerial', handleStartSerial)
    ipcMain.handle('endSerial', handleEndSerial)
    createWindow()
  })
  .then()

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

async function handleGetSerialOptions() {
  try {
    return await SerialPort.list()
  } catch {
    return false
  }
}
const requestedPorts = new Set<string>()
const openPorts = new Map<string, SerialPort>()
async function handleStartSerial(_: any, comPort: string) {
  if (openPorts.has(comPort)) {
    const port = openPorts.get(comPort)
    if (port) {
      await closeAsync(comPort)
    }
  }

  function openPort() {
    try {
      const port = new SerialPort({ path: comPort, baudRate: 9600 })
      openPorts.set(comPort, port)
      const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))
      parser.on('data', (data) =>
        mainWindow?.webContents.send('serialCapture', comPort, data)
      )
      port.on('open', () => {
        mainWindow?.webContents.send(
          'emitNotify',
          'positive',
          'RFID reader connection established'
        )
      })
      port.on('end', () => {
        openPorts.delete(comPort)
        openPort()
      })
      port.on('close', () => {
        mainWindow?.webContents.send(
          'emitNotify',
          'negative',
          'Lost connection with RFID reader'
        )
        openPorts.delete(comPort)
        openPort()
      })
      port.on('error', () => {
        openPorts.delete(comPort)
        setTimeout(() => openPort(), 5000)
      })
    } catch {
      console.log('error opening port')
      setTimeout(() => openPort(), 5000)
    }
  }
  openPort()
}

async function closeAsync(comPort: string) {
  return new Promise<void>((resolve) => {
    const port = openPorts.get(comPort)
    if (!port) {
      return
    }
    port.removeAllListeners()
    port.close(() => {
      openPorts.delete(comPort)
      resolve()
    })
  })
}

async function handleEndSerial() {
  console.log('closing ports')
  openPorts.forEach(async (v, k) => await closeAsync(k))
}