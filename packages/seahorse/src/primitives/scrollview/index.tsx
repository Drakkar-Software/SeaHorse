'use client'
import React from 'react'
import { ScrollView as ExpoScrollView } from '@expo/ui'
import type { ScrollViewProps } from '@expo/ui'
import { useHostWrap } from '../_host/ForgeHost'

function ScrollView(props: ScrollViewProps) {
  return useHostWrap(<ExpoScrollView {...props} />)
}

ScrollView.displayName = 'ScrollView'

export { ScrollView }
export type { ScrollViewProps }
