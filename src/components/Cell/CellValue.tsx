import React from 'react'
import { Text } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

export interface CellValueProps {
  className?: string
  value?: string | number
  placeholder?: string | number
  maxLines?: number
}

const CellValue: React.FC<CellValueProps> = ({ value, placeholder, maxLines, className }) => {
  const hasValue = value !== undefined && value !== null && value !== ''

    const dynamicStyle: React.CSSProperties = maxLines !== 1 ? {
      WebkitLineClamp: maxLines,
    } : {}

  if (hasValue) {
    return (
      <Text
        className={formatClassNames(
          styles['value-text'],
          className
        )}
        style={dynamicStyle}
      >
        {value}
      </Text>
    )
  }

  if (placeholder !== undefined && placeholder !== null) {
    return (
      <Text className={formatClassNames(
        styles['placeholder-text'],
        className
      )}>
        {placeholder}
      </Text>
    )
  }

  return null
}

export default CellValue