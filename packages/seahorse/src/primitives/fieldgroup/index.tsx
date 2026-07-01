'use client'
import React from 'react'
import { FieldGroup as ExpoFieldGroup } from '@expo/ui'
import type { FieldGroupProps } from '@expo/ui'
import { useHostWrap } from '../_host/ForgeHost'

function FieldGroupImpl(props: FieldGroupProps) {
  return useHostWrap(<ExpoFieldGroup {...props} />)
}
FieldGroupImpl.displayName = 'FieldGroup'

const FieldGroup = FieldGroupImpl as typeof FieldGroupImpl & {
  Section: typeof ExpoFieldGroup.Section
  SectionHeader: typeof ExpoFieldGroup.SectionHeader
  SectionFooter: typeof ExpoFieldGroup.SectionFooter
}
FieldGroup.Section = ExpoFieldGroup.Section
FieldGroup.SectionHeader = ExpoFieldGroup.SectionHeader
FieldGroup.SectionFooter = ExpoFieldGroup.SectionFooter

export { FieldGroup }
export type { FieldGroupProps } from '@expo/ui'
export type { FieldSectionProps, FieldSectionHeaderProps, FieldSectionFooterProps } from '@expo/ui'
