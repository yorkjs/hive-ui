import React from 'react'
import { View, Text, ITouchEvent } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import Icon from '../Icon'
import { getCellConfig } from './config'

import styles from './index.module.styl'

export interface CellGroupProps {
  title: string
  tooltip?: any
  className?: string
}

const CellGroup: React.FC<CellGroupProps> = ({ title, tooltip, className }) => {
  const handleTooltip = (e: ITouchEvent) => {
    e.stopPropagation()

    const data = { title, tooltip }
    const config = getCellConfig()
    config.onTooltipPress(data)
  }

  return (
    <View className={formatClassNames(styles['cell-group'], className)}>
      <Text className={styles['group-text']}>
        {title}
      </Text>
      {
        tooltip ? (
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

export default CellGroup