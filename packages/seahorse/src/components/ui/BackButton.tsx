import React from 'react'
import { View, Pressable, Text } from 'react-native-css/components'
import { ArrowLeft } from 'lucide-react-native'
import { cn } from '../../utils/cn'

export function BackButton({
  text,
  className,
  onPress,
}: {
  text: string
  className?: string
  onPress: () => void
}) {
  return (
    <View className={cn('flex flex-row', className)}>
      <Pressable onPress={onPress} className="flex-row items-center">
        <ArrowLeft size={16} className="mr-1 text-typography-500" />
        <Text className="text-md text-typography-500">{text}</Text>
      </Pressable>
    </View>
  )
}
