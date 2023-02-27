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
  channel: SerialChannelName
}
export type SerialListenerCB = (
  channel: SerialChannelName,
  data: string,
  lookup: PartialDeep<Locator> | null,
  repeated: boolean
) => void | true | Promise<void | true>

export type ScannedCards = Array<ScannedCard>
