import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import { formatClassNames } from '../../util/function'

import Card from '../../components/Card'
import Icon from '../../components/Icon'

import styles from './index.module.styl'

export interface EntryItemCardProps {
  /** 标题 */
  title: React.ReactNode
  /** 描述文案 */
  desc?: React.ReactNode
  /** 左侧图标：支持远程图片链接或 ReactNode */
  icon?: React.ReactNode
  /** 是否显示右侧内置箭头，默认 true */
  showArrow?: boolean
  /** 箭头颜色 */
  arrowColor?: string
  /** 是否显示顶部大留白 (通常 10PX) */
  showTopBlank?: boolean
  /** 是否显示顶边距 */
  showTopGutter?: boolean
  /** 点击回调 */
  onClick?: () => void
  /** 外部样式 */
  className?: string
}

const EntryItemCard: React.FC<EntryItemCardProps> = (props) => {
  const {
    title,
    desc,
    icon,
    showArrow = true,
    arrowColor = 'var(--textPlaceholder)',
    showTopBlank,
    showTopGutter,
    onClick,
    className,
  } = props

  return (
    <Card
      className={formatClassNames(styles['entry-item-card'], className)}
      showTopBlank={showTopBlank}
      showTopGutter={showTopGutter}
    >
      <View className={styles['card-main-body']} onClick={onClick}>
        {icon && (
          <View className={styles['card-icon-section']}>
            {
              typeof icon === 'string'
              ? (
                <Image
                  className={styles['menu-icon']}
                  src={icon}
                  mode="aspectFit"
                />
              )
              : (
                icon
              )
            }
          </View>
        )}

        <View className={styles['card-info']}>
          <View className={styles['card-title']}>
            {
              typeof title === 'string'
              ? <Text>{title}</Text>
              : title
            }
          </View>
          {desc && (
            <View className={styles['card-desc']}>
              {
                typeof desc === 'string'
                ? <Text>{desc}</Text>
                : desc
              }
            </View>
          )}
        </View>

        {showArrow && (
          <View className={styles['card-right-section']}>
            <Icon
              name="right"
              size={14}
              color={arrowColor}
              className={styles['arrow-icon']}
            />
          </View>
        )}
      </View>
    </Card>
  )
}

export default React.memo(EntryItemCard)