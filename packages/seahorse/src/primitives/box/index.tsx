import React from 'react'
import { View } from 'react-native-css/components'
import type { ViewProps } from 'react-native'

type BoxProps = ViewProps & { className?: string }

const Box = React.forwardRef<React.ElementRef<typeof View>, BoxProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={className} {...props} />
  ),
)

Box.displayName = 'Box'
export { Box }
