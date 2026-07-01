'use client'
import React from 'react'
import { Text as ExpoText } from '@expo/ui'
import type { TextProps } from '@expo/ui'
import { useHostWrap } from '../_host/ForgeHost'

function Text(props: TextProps) {
  return useHostWrap(<ExpoText {...props} />)
}

Text.displayName = 'Text'

export { Text }
export type { TextProps }
