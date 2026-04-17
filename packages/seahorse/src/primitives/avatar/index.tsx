import React, { createContext, useContext, useState, useLayoutEffect, useCallback } from 'react'
import { View, Text, Image } from 'react-native-css/components'
import { Platform } from 'react-native'
import { cn } from '../../utils/cn'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

type AvatarContextType = {
  size: AvatarSize
  hasImage: boolean
  setHasImage: (v: boolean) => void
}

const AvatarContext = createContext<AvatarContextType>({
  size: 'md',
  hasImage: false,
  setHasImage: () => {},
})

const sizeClasses: Record<AvatarSize, string> = {
  'xs': 'w-6 h-6',
  'sm': 'w-8 h-8',
  'md': 'w-12 h-12',
  'lg': 'w-16 h-16',
  'xl': 'w-24 h-24',
  '2xl': 'w-32 h-32',
}

const fallbackTextSizeClasses: Record<AvatarSize, string> = {
  'xs': 'text-2xs',
  'sm': 'text-xs',
  'md': 'text-base',
  'lg': 'text-xl',
  'xl': 'text-3xl',
  '2xl': 'text-5xl',
}

const badgeSizeClasses: Record<AvatarSize, string> = {
  'xs': 'w-2 h-2',
  'sm': 'w-2 h-2',
  'md': 'w-3 h-3',
  'lg': 'w-4 h-4',
  'xl': 'w-6 h-6',
  '2xl': 'w-8 h-8',
}

type AvatarProps = React.ComponentPropsWithoutRef<typeof View> & {
  className?: string
  size?: AvatarSize
}

const Avatar = React.forwardRef<React.ElementRef<typeof View>, AvatarProps>(
  ({ className, size = 'md', children, ...props }, ref) => {
    const [hasImage, setHasImage] = useState(false)
    return (
      <AvatarContext.Provider value={{ size, hasImage, setHasImage }}>
        <View
          ref={ref}
          className={cn(
            'rounded-full justify-center items-center relative bg-primary-600 group-[.avatar-group]/avatar-group:-ml-2.5',
            sizeClasses[size],
            className,
          )}
          {...props}
        >
          {children}
        </View>
      </AvatarContext.Provider>
    )
  },
)

type AvatarBadgeProps = React.ComponentPropsWithoutRef<typeof View> & {
  className?: string
}

const AvatarBadge = React.forwardRef<React.ElementRef<typeof View>, AvatarBadgeProps>(
  ({ className, ...props }, ref) => {
    const { size } = useContext(AvatarContext)
    return (
      <View
        ref={ref}
        className={cn(
          'bg-success-500 rounded-full absolute right-0 bottom-0 border-background-0 border-2',
          badgeSizeClasses[size],
          className,
        )}
        {...props}
      />
    )
  },
)

type AvatarFallbackTextProps = React.ComponentPropsWithoutRef<typeof Text> & {
  className?: string
}

const AvatarFallbackText = React.forwardRef<
  React.ElementRef<typeof Text>,
  AvatarFallbackTextProps
>(({ className, ...props }, ref) => {
  const { size, hasImage } = useContext(AvatarContext)
  if (hasImage) return null
  return (
    <Text
      ref={ref}
      className={cn(
        'text-typography-0 font-semibold overflow-hidden uppercase web:cursor-default',
        fallbackTextSizeClasses[size],
        className,
      )}
      {...props}
    />
  )
})

type AvatarImageProps = React.ComponentPropsWithoutRef<typeof Image> & {
  className?: string
}

const AvatarImage = React.forwardRef<React.ElementRef<typeof Image>, AvatarImageProps>(
  ({ className, source, onError, ...props }, ref) => {
    const { setHasImage } = useContext(AvatarContext)
    const sourceUri = (source as any)?.uri

    useLayoutEffect(() => {
      setHasImage(!!sourceUri)
    }, [sourceUri])

    const handleError = useCallback(() => {
      setHasImage(false)
      ;(onError as any)?.()
    }, [setHasImage, onError])

    return (
      <Image
        ref={ref}
        className={cn('h-full w-full rounded-full absolute', className)}
        source={source}
        onError={handleError}
        {...props}
        // @ts-expect-error web revert-layer
        style={
          Platform.OS === 'web'
            ? { height: 'revert-layer', width: 'revert-layer' }
            : undefined
        }
      />
    )
  },
)

type AvatarGroupProps = React.ComponentPropsWithoutRef<typeof View> & {
  className?: string
}

const AvatarGroup = React.forwardRef<React.ElementRef<typeof View>, AvatarGroupProps>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn('group/avatar-group flex-row-reverse relative avatar-group', className)}
      {...props}
    />
  ),
)

Avatar.displayName = 'Avatar'
AvatarBadge.displayName = 'AvatarBadge'
AvatarFallbackText.displayName = 'AvatarFallbackText'
AvatarImage.displayName = 'AvatarImage'
AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage, AvatarGroup }
