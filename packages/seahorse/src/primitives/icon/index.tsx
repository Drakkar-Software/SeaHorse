'use client'
import React from 'react'
import { Icon as ExpoIcon } from '@expo/ui'
import type { IconProps } from '@expo/ui'
import { useHostWrap } from '../_host/ForgeHost'

/**
 * Platform-native icon: SF Symbol on iOS, `@expo/material-symbols` XML drawable
 * on Android. Not Lucide-compatible — pass `name` via `Icon.select({ ios, android })`.
 */
function Icon(props: IconProps) {
  return useHostWrap(<ExpoIcon {...props} />)
}

Icon.displayName = 'Icon'
Icon.select = ExpoIcon.select

export { Icon }
export type { IconProps }
