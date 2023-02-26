import type { DateTime } from 'luxon'
import type { Locator, User } from 'src/generated/graphql'
import type { PartialDeep } from 'type-fest'
import { SerialChannelName } from './serial'

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
  channel: SerialChannelName,
  data: string,
  lookup: PartialDeep<Locator> | null
) => void | true | Promise<void | true>
