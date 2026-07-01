'use client'
import React from 'react'
import { Spacer as ExpoSpacer } from '@expo/ui'
import type { SpacerProps } from '@expo/ui'

/** Layout spacer for a native `Row`/`Column` — meaningless without one, so it does not self-host. */
function Spacer(props: SpacerProps) {
  return <ExpoSpacer {...props} />
}

Spacer.displayName = 'Spacer'

export { Spacer }
export type { SpacerProps }
