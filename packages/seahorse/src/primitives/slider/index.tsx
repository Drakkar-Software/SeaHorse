'use client'
import React from 'react'
import { Slider as ExpoSlider } from '@expo/ui'
import type { SliderProps } from '@expo/ui'
import { useHostWrap } from '../_host/ForgeHost'

function Slider(props: SliderProps) {
  return useHostWrap(<ExpoSlider {...props} />)
}

Slider.displayName = 'Slider'

export { Slider }
export type { SliderProps }
