import React from 'react'
import { View } from '@tarojs/components'
import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

export interface CardProps {
  className?: string
  showTopGutter?: boolean
  showBottomGutter?: boolean
  showTopBlank?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

const CellCard: React.FC<CardProps> = ({
  showTopGutter = false,
  showBottomGutter = false,
  showTopBlank = false,
  onClick,
  className,
  children
}) => {
  const combinedClass = formatClassNames(
    styles['card'],
    {
      [styles['show-top-gutter']]: showTopGutter,
      [styles['show-bottom-gutter']]: showBottomGutter,
      [styles['show-top-blank']]: showTopBlank,
    },
    className
  )

  return (
    <View
      className={combinedClass}
      onClick={onClick}
    >
      {children}
    </View>
  )
}

export default CellCard