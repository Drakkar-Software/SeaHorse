'use client'
import React from 'react'
import { Row as ExpoRow } from '@expo/ui'
import type { RowProps } from '@expo/ui'
import { useHostWrap } from '../_host/ForgeHost'

function Row(props: RowProps) {
  return useHostWrap(<ExpoRow {...props} />)
}

Row.displayName = 'Row'

export { Row }
export type { RowProps }
