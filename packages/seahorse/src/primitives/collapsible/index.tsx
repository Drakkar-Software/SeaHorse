'use client'
import React from 'react'
import { Collapsible as ExpoCollapsible } from '@expo/ui'
import type { CollapsibleProps } from '@expo/ui'
import { useHostWrap } from '../_host/ForgeHost'

function Collapsible(props: CollapsibleProps) {
  return useHostWrap(<ExpoCollapsible {...props} />)
}

Collapsible.displayName = 'Collapsible'

export { Collapsible }
export type { CollapsibleProps }
