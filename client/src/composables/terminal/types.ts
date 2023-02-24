import type { User, Locator } from 'src/generated/graphql'
import type { DateTime } from 'luxon'
import type { PartialDeep } from 'type-fest'

export type TerminalSetup = {
  cardReaderPort?: string
  barcodeReaderPort?: string
}

export type TerminalUser = User & { token: string }

export type ScannedCard = {
  value: string
  seen: boolean
  when: DateTime
  lookup?: PartialDeep<Locator> | null
}

export type SerialListenerCB = (
  channel: SerialChannels,
  data: string,
  lookup: PartialDeep<Locator> | null
) => void | true | Promise<void | true>

export type SerialChannels = 'RFID' | 'BARCODE'
