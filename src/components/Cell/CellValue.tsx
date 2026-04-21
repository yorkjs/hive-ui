import React from 'react'
import { ITouchEvent, Text } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

export interface CellValueProps {
  className?: string
  value?: string | number
  placeholder?: string | number
  maxLines?: number
  onClick?:(event: ITouchEvent) => void
}

const CellValue: React.FC<CellValueProps> = ({
  value,
  placeholder,
  maxLines,
  className,
  onClick,
}) => {
  const hasValue = value !== undefined && value !== null && value !== ''

  const dynamicStyle: React.CSSProperties = maxLines !== 1 ? {
    WebkitLineClamp: maxLines,
  } : {}

  const handlePress = (e: ITouchEvent) => {
    if (onClick) {
      e.stopPropagation()
      onClick(e)
    }
  }

  if (hasValue) {
    return (
      <Text
        className={formatClassNames(
          styles['value-text'],
          className
        )}
        style={dynamicStyle}
        onClick={handlePress}
      >
        {value}
      </Text>
    )
  }

  if (placeholder !== undefined && placeholder !== null) {
    return (
      <Text
        className={formatClassNames(
          styles['placeholder-text'],
          className
        )}
        onClick={handlePress}
      >
        {placeholder}
      </Text>
    )
  }

  return null
}

export default CellValue