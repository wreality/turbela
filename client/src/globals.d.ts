import type { PortInfo } from '@serialport/bindings-cpp'
import { SerialChannelName } from './composables/terminal'

export {}

declare global {
  interface Window {
    turbela: TurbelaContext
  }
}

interface TurbelaContext {
  minimize: () => void
  toggleMaximize: () => void
  close: () => void
  serialCapture: (callback: SerialCallback) => void
  emitNotify: (
    callback: (e: any, type: 'positive' | 'negative', message: string) => void
  ) => void
  getSerialOptions: () => Promise<PortInfo[] | false>
  openUrl: (url: string) => void
  startSerial: (port: string, channel: SerialChannelName) => void
  endSerial: () => void
  relaunch: () => void
}

type SerialCallback = (
  e: any,
  comport: string,
  channel: SerialChannelName,
  data: string
) => any
