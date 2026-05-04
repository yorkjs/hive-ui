import React from 'react'
import { View, Text } from '@tarojs/components'
import { formatClassNames } from '../../util/function'

import Card from '../../components/Card'

import styles from './index.module.styl'
import Icon from '../../components/Icon'

export interface ListItemCardProps {
  /** 标题 */
  title: React.ReactNode
  /** 中间多行内容：支持字符串数组或 ReactNode 数组 */
  contents?: React.ReactNode[]
  /** 右侧额外区域：完全自定义 Tag */
  extra?: React.ReactNode
  /** 是否显示右侧内置箭头 */
  showArrow?: boolean
  /** 箭头颜色，默认 #CCCCCC */
  arrowColor?: string
  /** 底部操作区域（自定义按钮组等） */
  footer?: React.ReactNode
  /** 是否显示顶边距 (通常 10PX) */
  showTopGutter?: boolean
  /** 是否显示底边距 (通常 10PX) */
  showBottomGutter?: boolean
  /** 是否显示顶部大留白 (通常 16PX) */
  showTopBlank?: boolean
  /** 是否显示底部分割线 */
  showSeparator?: boolean
  /** 点击主体区域的回调 */
  onClick?: () => void
  /** 外部样式 */
  className?: string
}

const ListItem: React.FC<ListItemCardProps> = (props) => {
  const {
    title,
    contents = [],
    extra,
    showArrow = false,
    arrowColor = 'var(--textPlaceholder)',
    footer,
    showTopGutter,
    showBottomGutter,
    showTopBlank,
    showSeparator = false,
    onClick,
    className,
  } = props

  return (
    <Card
      className={formatClassNames(
        styles['list-item-card'],
        className
      )}
      showTopBlank={showTopBlank}
      showTopGutter={showTopGutter}
      showBottomGutter={showBottomGutter}
    >
      <View
        className={
          formatClassNames(styles['card-main-body'], {
          [styles['show-separator']]: showSeparator,
          [styles['no-footer']]: !footer
        })}
        onClick={onClick}
      >
        <View className={styles['card-info']}>
          <View className={styles['card-title']}>
            {
              typeof title === 'string'
              ? <Text>{title}</Text>
              : title
            }
          </View>

          {contents.map((item, index) => (
            <View key={index} className={styles['card-text-line']}>
              {
                typeof item === 'string'
                ? <Text>{item}</Text>
                : item
              }
            </View>
          ))}
        </View>

        {(extra || showArrow) && (
          <View className={styles['card-right-section']}>
            {
              extra
              ? (
                <View className={styles['extra-wrapper']}>
                  {extra}
                </View>
              )
              : undefined
            }
            {showArrow && (
              <Icon
                name="right"
                size={13}
                color={arrowColor}
                className={styles['internal-arrow']}
              />
            )}
          </View>
        )}
      </View>

      {
        footer
        ? (
          <View className={styles['card-footer']}>
            {footer}
          </View>
        )
        : undefined
      }
    </Card>
  )
}

export default React.memo(ListItem)