import React from 'react'
import { View, Text, Image } from '@tarojs/components'

import {
  formatClassNames,
  isEmpty
} from '../../util/function'

import styles from './index.module.styl'

interface IProps {
  /** 左侧图标链接 */
  icon?: string
  /** 标题 */
  title?: string
  /** 时间或下方副标题 */
  time?: string | React.ReactNode
  /** 右侧金额 */
  amount?: string | number
  /** 金额颜色，不传默认 */
  amountColor?: string
  /** 右侧下方的描述或状态 */
  desc?: string
  /** 描述文字颜色 */
  descColor?: string
  /** 是否隐藏底部分割线 */
  showSeparator?: boolean
  /** 点击事件 */
  onClick?: () => void
  className?: string
}

const FlowItem: React.FC<IProps> = (props) => {
  const {
    icon,
    title,
    time,
    amount,
    amountColor,
    desc,
    descColor,
    showSeparator = false,
    onClick,
    className
  } = props

  return (
    <View
      className={formatClassNames(
        styles['flow-item'],
        className
      )}
      onClick={onClick}
    >
      <View className={showSeparator ? 'flow-content-no-border' : 'flow-content'}>
        <View className="flow-item-left">
          {
            !isEmpty(icon)
            ? (
              <View className="flow-item-icon">
                <Image
                  src={icon}
                  className="icon-img"
                  mode="aspectFit"
                />
              </View>
            ) : undefined
          }

          <View className="flow-item-content">
            {
              !isEmpty(title)
              ? (
                <Text className="flow-item-title">
                  {title}
                </Text>
              )
              : undefined
            }
            {
              !isEmpty(time)
              ? (
                <View className="flow-item-time-container">
                  {
                    typeof time === 'string'
                    ? (
                      <Text className="flow-item-time">{time}</Text>
                    )
                    : (
                      time
                    )
                  }
                </View>
              )
              : undefined
            }
          </View>
        </View>

        <View className="flow-item-right">
          {
            amount !== undefined
            ? (
              <Text
                className="flow-item-amount"
                style={amountColor ? { color: amountColor } : {}}
              >
                {amount}
              </Text>
            )
            : undefined
          }
          {
            !isEmpty(desc)
            ? (
              <Text
                className="flow-item-desc"
                style={descColor ? { color: descColor } : {}}
              >
                {desc}
              </Text>
            )
            : undefined
          }
        </View>
      </View>
    </View>
  )
}

export default React.memo(FlowItem)
