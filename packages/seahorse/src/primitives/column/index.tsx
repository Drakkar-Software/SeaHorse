'use client'
import React from 'react'
import { Column as ExpoColumn } from '@expo/ui'
import type { ColumnProps } from '@expo/ui'
import { useHostWrap } from '../_host/ForgeHost'

function Column(props: ColumnProps) {
  return useHostWrap(<ExpoColumn {...props} />)
}

Column.displayName = 'Column'

export { Column }
export type { ColumnProps }
