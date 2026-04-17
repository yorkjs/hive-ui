import React from 'react'
import { View, Text, ITouchEvent } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import Icon from '../Icon'

import { getCellConfig } from './config'

import styles from './index.module.styl'

export interface CellTitleProps {
  className?: string
  required?: boolean
  title: string
  tooltip?: any
  style?: React.CSSProperties
}

const CellTitle: React.FC<CellTitleProps> = ({
  required,
  title,
  tooltip,
  style,
  className
}) => {
  const handleTooltip = (e: ITouchEvent) => {
    e.stopPropagation()

    const data = { title, tooltip }
    const config = getCellConfig()
    config.onTooltipPress(data)
  }

  return (
    <View className={formatClassNames(
      styles['title-view'],
      className,
    )}>
      {
        required
        ? (
          <Icon
            name="asterisk"
            color="#FF0000"
            size={7}
            className={styles['required-icon']}
          />
        )
        : undefined
      }
      <Text className={styles['title-text']} style={style}>
        {title}
      </Text>
      {
        tooltip
        ? (
          <Icon
            className={styles['tooltip-icon']}
            name='question-circle'
            onClick={handleTooltip}
            size={14}
          />
        )
        : undefined
      }
    </View>
  )
}

export default CellTitle