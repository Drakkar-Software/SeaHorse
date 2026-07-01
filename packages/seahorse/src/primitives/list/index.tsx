'use client'
import React from 'react'
import { List as ExpoList, ListItem as ExpoListItem } from '@expo/ui'
import type { ListProps, ListItemProps } from '@expo/ui'
import { useHostWrap } from '../_host/ForgeHost'

function List(props: ListProps) {
  return useHostWrap(<ExpoList {...props} />)
}
List.displayName = 'List'

function ListItemImpl(props: ListItemProps) {
  return useHostWrap(<ExpoListItem {...props} />)
}
ListItemImpl.displayName = 'ListItem'

const ListItem = ListItemImpl as typeof ListItemImpl & {
  Leading: typeof ExpoListItem.Leading
  Trailing: typeof ExpoListItem.Trailing
  Supporting: typeof ExpoListItem.Supporting
}
ListItem.Leading = ExpoListItem.Leading
ListItem.Trailing = ExpoListItem.Trailing
ListItem.Supporting = ExpoListItem.Supporting

export { List, ListItem }
export type { ListProps, ListItemProps } from '@expo/ui'
