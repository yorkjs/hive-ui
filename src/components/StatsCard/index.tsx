import React, { Fragment } from 'react'
import { View, Text } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

export interface StatsCardItem {
  /** 统计项唯一标识 */
  key: string | number
  /** 统计数值 */
  value: React.ReactNode
  /** 统计项名称 */
  label: React.ReactNode
}

export interface StatsCardProps {
  /** 卡片标题，不传则不显示标题区域 */
  title?: React.ReactNode
  /** 统计项列表 */
  items: StatsCardItem[]
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
  /** 是否显示顶部间距 */
  showTopGutter?: boolean
  /** 是否显示底部间距 */
  showBottomGutter?: boolean
}

/** 展示标题和横向统计数据的卡片 */
const StatsCard: React.FC<StatsCardProps> = ({
  title,
  items,
  className,
  style,
  showTopGutter = false,
  showBottomGutter = false,
}) => (
  <View
    className={formatClassNames(
      styles['stats-card'],
      {
        [styles['show-top-gutter']]: showTopGutter,
        [styles['show-bottom-gutter']]: showBottomGutter,
      },
      className
    )}
    style={style}
  >
    {title !== undefined && title !== null && (
      <View className={styles['card-title']}>
        {typeof title === 'string' ? <Text>{title}</Text> : title}
      </View>
    )}
    <View className={styles['stats-row']}>
      {items.map((item, index) => (
        <Fragment key={item.key}>
          {index > 0 && <View className={styles['stat-divider']} />}
          <View className={styles['stat-item']}>
            <View className={styles['stat-value']}>
              {typeof item.value === 'string' || typeof item.value === 'number'
                ? <Text>{item.value}</Text>
                : item.value}
            </View>
            <View className={styles['stat-label']}>
              {typeof item.label === 'string' || typeof item.label === 'number'
                ? <Text>{item.label}</Text>
                : item.label}
            </View>
          </View>
        </Fragment>
      ))}
    </View>
  </View>
)

export default StatsCard
