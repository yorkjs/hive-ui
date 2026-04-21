import React from 'react'
import { View, Text, ITouchEvent } from '@tarojs/components'
import { formatClassNames } from '../../util/function'
import Icon from '../Icon'
import styles from './index.module.styl'

export interface FieldCardProps {
  /** 标题内容：支持字符串或自定义 DOM */
  title: React.ReactNode
  /** 是否显示标题旁的编辑小图标 */
  showEditIcon?: boolean
  /** 点击编辑图标的回调 */
  onEditClick?: (e: ITouchEvent) => void
  /** 右侧动作区域：支持字符串、Icon 或自定义节点 */
  extra?: React.ReactNode
  /** 点击右侧 extra 区域的回调 (会自动阻止冒泡) */
  onExtraClick?: (e: ITouchEvent) => void
  /** 子组件 */
  children?: React.ReactNode
  /** 外部样式 */
  className?: string
}

const FieldCard: React.FC<FieldCardProps> = (props) => {
  const {
    title,
    showEditIcon = false,
    onEditClick,
    extra,
    onExtraClick,
    children,
    className
  } = props

  const handleEditClick = (e: ITouchEvent) => {
    if (onEditClick) {
      e.stopPropagation()
      onEditClick(e)
    }
  }

  const handleExtraClick = (e: ITouchEvent) => {
    if (onExtraClick) {
      e.stopPropagation()
      onExtraClick(e)
    }
  }

  return (
    <View className={formatClassNames(styles['field-card-container'], className)}>
      <View className={styles['card-head-wrapper']}>
        <View className={styles['card-header']}>
          <View className={styles['header-left']}>
            {
              typeof title === 'string'
              ? (
                <Text className={styles['header-title']}>{title}</Text>
              )
              : (
                title
              )
            }

            {showEditIcon && (
              <View className={styles['edit-icon-wrapper']} onClick={handleEditClick}>
                <Icon
                  name='edit'
                  size={14}
                  className={styles['edit-icon']}
                />
              </View>
            )}
          </View>

          {extra && (
            <View className={styles['header-extra']} onClick={handleExtraClick}>
              {
                typeof extra === 'string' ? (
                  <Text
                    className={styles['action-text']}
                  >
                    {extra}
                  </Text>
                )
                : (
                  extra
                )
              }
            </View>
          )}
        </View>
      </View>

      <View className={styles['card-content']}>
        {children}
      </View>
    </View>
  )
}

export default FieldCard