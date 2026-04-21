import React from 'react'
import { View, Text } from '@tarojs/components'
import styles from './index.module.styl'
import { formatClassNames } from '../../util/function'

interface IRowProps {
  label: React.ReactNode
  value?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

const InfoRow: React.FC<IRowProps> = ({
  label,
  value,
  children,
  className
}) => (
  <View
    className={formatClassNames(styles['info-row'], className)}
  >
    <View className={styles['info-label']}>
      {
        typeof label === 'string'
          ? <Text>{label}</Text>
          : label
      }
    </View>
    <View className={styles['info-value']}>
      {children || value || '-'}
    </View>
  </View>
)

interface IBlockProps {
  children?: React.ReactNode
  className?: string
}

const InfoBlock: React.FC<IBlockProps> = ({
  children,
  className
}) => (
  <View
    className={className}
  >
    {children}
  </View>
)

interface ICardProps {
  title?: React.ReactNode
  showTopGutter?: boolean
  showBottomGutter?: boolean
  showTopBlank?: boolean
  extra?: React.ReactNode
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const DisplayCardMain: React.FC<ICardProps> = ({
  title,
  extra,
  children,
  className,
  style,
  showTopGutter = false,
  showBottomGutter = false,
  showTopBlank = false,
}) => {
  return (
    <View
      className={formatClassNames(
        styles['display-card'],
        {
          [styles['show-top-gutter']]: showTopGutter,
          [styles['show-bottom-gutter']]: showBottomGutter,
          [styles['show-top-blank']]: showTopBlank,
        },
        className
      )}
      style={style}
    >
      {
        (title || extra)
        ? (
          <View className={styles['card-header']}>
            <View className={styles['header-title']}>
              {
                typeof title === 'string'
                  ? <Text>{title}</Text>
                  : title
              }
            </View>
            {
              extra ? (
                <View className={styles['header-extra']}>
                  {extra}
                </View>
              )
              : undefined
            }
          </View>
        )
        : undefined
      }
      <View className={styles['card-content']}>
        {children}
      </View>
    </View>
  )
}

const DisplayCard = Object.assign(DisplayCardMain, {
  Row: InfoRow,
  Block: InfoBlock,
})

export default DisplayCard