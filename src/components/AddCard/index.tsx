import React from 'react'
import { View, Text } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import Card from '../Card'
import Icon from '../Icon'

import styles from './index.module.styl'

export interface AddCardProps {
  /** 图标名称，默认 plus-circle-fill */
  iconName?: string
  /** 图标颜色 */
  iconColor?: string
  /** 图标大小，默认 20PX */
  iconSize?: number | string
  /** 图标自定义样式名 */
  iconClassName?: string
  /** 显示文本 */
  text?: React.ReactNode
  /** 点击回调 */
  onClick?: () => void
  /** 是否显示底部间距 */
  showBottomGutter?: boolean
  /** 是否显示顶部间距 */
  showTopGutter?: boolean
  /** 是否显示顶部大留白 */
  showTopBlank?: boolean
  /** Card 外层样式名 */
  warpClassName?: string
  /** Card 内层样式名 */
  className?: string
}

const AddCard: React.FC<AddCardProps> = (props) => {
  const {
    iconName = 'plus-circle-fill',
    iconColor = 'var(--primary)',
    iconSize = 16,
    iconClassName,
    text,
    onClick,
    showBottomGutter = true,
    showTopGutter,
    showTopBlank,
    warpClassName,
    className,
  } = props

  return (
    <Card
      clickable
      showBottomGutter={showBottomGutter}
      showTopGutter={showTopGutter}
      showTopBlank={showTopBlank}
      warpClassName={warpClassName}
      className={formatClassNames(styles['add-card'], className)}
      onClick={onClick}
    >
      <View className={styles['add-card-content']}>
        <Icon
          name={iconName}
          size={iconSize}
          color={iconColor}
          className={iconClassName}
        />
        {text !== undefined && (
          <Text className={styles['add-card-text']}>
            {text}
          </Text>
        )}
      </View>
    </Card>
  )
}

export default React.memo(AddCard)
