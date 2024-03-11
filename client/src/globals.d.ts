import { SerialChannelName } from './composables/terminal'
import type { PortInfo } from '@serialport/bindings-cpp'
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


declare module 'vue-router' {
  interface RouteMeta {
    navigation?: {
      label: string
      icon: string
    }
    /**
     * @deprecated
     */
    pageTitle?: string
  }
}
