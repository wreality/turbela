import { enable, initialize } from '@electron/remote/main'
import { ReadlineParser } from '@serialport/parser-readline'
import { BrowserWindow, app, ipcMain, nativeTheme } from 'electron'
import installExtension, {
  APOLLO_DEVELOPER_TOOLS,
} from 'electron-devtools-installer'
import windowStateKeeper from 'electron-window-state'
import os from 'os'
import path from 'path'
import { SerialPort } from 'serialport'
import type { SerialChannelName } from './../src/composables/terminal'
initialize()

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

nativeTheme.themeSource = 'system'
console.log(nativeTheme.themeSource)
try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    )
  }
} catch (_) {}

let mainWindow: BrowserWindow | null

function createWindow() {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1700,
    defaultHeight: 800,
  })

  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
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
  mainWindowState.manage(mainWindow)
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
    ipcMain.handle('relaunch', relaunchApp)
    if (process.env.DEBUGGING) {
      installExtension(APOLLO_DEVELOPER_TOOLS)
    }
    createWindow()
  })
  .then()

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})
if (process.env.DEV) {
  // SSL/TSL: this is the self signed certificate support
  app.on(
    'certificate-error',
    (event, webContents, url, error, certificate, callback) => {
      // On certificate error we disable default behaviour (stop loading the page)
      // and we then say "it is all fine - true" to the callback
      event.preventDefault()
      callback(true)
    }
  )
}

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
const openPorts = new Map<string, SerialPort>()
async function handleStartSerial(
  _: any,
  comPort: string,
  channel: SerialChannelName
) {
  if (openPorts.has(comPort)) {
    const port = openPorts.get(comPort)
    if (port) {
      await closeAsync(comPort)
    }
  }
  console.log('opening: ' + comPort)
  function openPort() {
    try {
      const port = new SerialPort({ path: comPort, baudRate: 9600 })
      openPorts.set(comPort, port)
      const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))
      parser.on('data', (data) =>
        mainWindow?.webContents.send('serialCapture', comPort, channel, data)
      )
      port.on('open', () => {
        mainWindow?.webContents.send(
          'emitNotify',
          'positive',
          `serial.${channel}.connect`
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
          `serial.${channel}.closed`
        )
        openPorts.delete(comPort)
        openPort()
      })
      port.on('error', (error) => {
        openPorts.delete(comPort)
        setTimeout(() => openPort(), 5000)
      })
    } catch {
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
  openPorts.forEach(async (v, k) => await closeAsync(k))
}

function relaunchApp() {
  if (process.env.DEV) {
    mainWindow?.loadURL(process.env.APP_URL ?? '')
    //mainWindow?.reload()
  } else {
    app.relaunch()
    app.exit(0)
  }
}
