/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */
import { BrowserWindow } from '@electron/remote'
import { contextBridge, ipcRenderer } from 'electron'
import type { SerialChannelName } from './../src/composables/terminal'

contextBridge.exposeInMainWorld('turbela', {
  minimize() {
    BrowserWindow.getFocusedWindow()?.minimize()
  },
  toggleMaximize() {
    const win = BrowserWindow.getFocusedWindow()

    if (win?.isMaximized()) {
      win.unmaximize()
    } else {
      win?.maximize()
    }
  },
  close() {
    BrowserWindow.getFocusedWindow()?.close()
  },
  serialCapture: (
    callback: (
      e: any,
      comport: string,
      channel: SerialChannelName,
      data: string
    ) => any
  ) => ipcRenderer.on('serialCapture', callback),
  getSerialOptions: () => ipcRenderer.invoke('getSerialOptions'),
  startSerial: (comport: string, channel: SerialChannelName) =>
    ipcRenderer.invoke('startSerial', comport, channel),
  endSerial: () => ipcRenderer.invoke('endSerial'),
  emitNotify: (
    callback: (e: any, type: 'positive' | 'negative', message: string) => void
  ) => ipcRenderer.on('emitNotify', callback),
  relaunch: () => ipcRenderer.invoke('relaunch'),
})
