'use client'
import React from 'react'
import { Picker as ExpoPicker } from '@expo/ui'
import type { PickerProps, PickerItemValue } from '@expo/ui'
import { useHostWrap } from '../_host/ForgeHost'

function PickerImpl<T extends PickerItemValue = PickerItemValue>(props: PickerProps<T>) {
  return useHostWrap(<ExpoPicker {...props} />)
}
PickerImpl.displayName = 'Picker'

const Picker = PickerImpl as typeof PickerImpl & { Item: typeof ExpoPicker.Item }
Picker.Item = ExpoPicker.Item

export { Picker }
export type { PickerProps, PickerItemValue } from '@expo/ui'
