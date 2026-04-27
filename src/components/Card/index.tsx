import React from 'react'
import { View } from '@tarojs/components'
import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

export interface CardProps {
  warpClassName?: string
  className?: string
  showTopGutter?: boolean
  showBottomGutter?: boolean
  showTopBlank?: boolean
  children?: React.ReactNode
  clickable?: boolean
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({
  showTopGutter = false,
  showBottomGutter = false,
  showTopBlank = false,
  clickable,
  onClick,
  warpClassName,
  className,
  children
}) => {
  const isClickable = clickable !== undefined ? clickable : !!onClick

  const containerClass = formatClassNames(
    styles['card-container'],
    {
      [styles['show-top-gutter']]: showTopGutter,
      [styles['show-bottom-gutter']]: showBottomGutter,
      [styles['show-top-blank']]: showTopBlank,
    },
    warpClassName
  )

  const innerClass = formatClassNames(
    'card-inner',
    {
      'is-clickable': isClickable,
    },
    className
  )

  return (
    <View className={containerClass}>
      <View
        className={innerClass}
        onClick={onClick}
      >
        {children}
      </View>
    </View>
  )
}

export default Card