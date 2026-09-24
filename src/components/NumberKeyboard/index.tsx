import React, { useMemo } from 'react'
import { View, Text, Image } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import Icon from '../Icon'

import styles from './index.module.styl'

type KeyboardType = 'int' | 'number' | 'idCard'

interface IProps {
  /** 键盘类型：int(整数), number(带小数点) */
  type?: KeyboardType
  /** 插入字符回调 */
  onInsert: (val: string) => void
  /** 删除回调 */
  onDelete: () => void
  /** 是否显示头部状态栏 */
  showHead?: boolean
   /** 标题 */
  title?: string
  /** 完成按钮文案 */
  doneText?: string
  /** 完成按钮点击 */
  onDone?: () => void
  /** 左下角按键自定义文案，覆盖默认的小数点/X */
  bottomKeyText?: string
  /** 左下角按键自定义点击事件，不传则默认调用 onInsert */
  onBottomKeyClick?: () => void
  /** 外部样式名 */
  className?: string
}

const NumberKeyboard: React.FC<IProps> = (props) => {
  const {
    type = 'int',
    onInsert,
    onDelete,
    showHead = false,
    title,
    doneText = '完成',
    onDone,
    bottomKeyText,
    onBottomKeyClick,
    className
  } = props

  const bottomKey = useMemo(() => {
    if (bottomKeyText !== undefined) return bottomKeyText
    if (type === 'number') return '.'
    if (type === 'idCard') return 'X'
    return ''
  }, [type, bottomKeyText])

  const keys = useMemo(() => {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9', bottomKey, '0', 'delete']
  }, [bottomKey])

  const handleKeyPress = (key: string) => {
    if (key === 'delete') {
      onDelete()
    }
    else if (key !== '') {
      const isBottomKey = key === bottomKey && bottomKey !== ''
      if (isBottomKey && onBottomKeyClick) {
        onBottomKeyClick()
      } else {
        onInsert(key)
      }
    }
  }

  return (
    <View className={formatClassNames(styles['number-keyboard-component'], className)}>
      {
        showHead
        ? (
          <View className="keyboard-header">
            <View className="header-side" />

            <View className="header-main">
              {title && (
                <Text className="header-title" numberOfLines={1}>
                  {title}
                </Text>
              )}
            </View>

            <View className="header-side side-right">
              <View className="done-btn" onClick={onDone}>
                <Text className="done-text">{doneText}</Text>
              </View>
            </View>
          </View>
        ) : undefined
      }

      <View className={"keyboard-grid"}>
        {keys.map((key, index) => {
          const isDelete = key === 'delete'
          const isEmptyKey = key === ''

          return (
            <View
              key={index}
              className={formatClassNames("key-item", {
                'empty-key': isEmptyKey,
                'no-right-border': (index + 1) % 3 === 0,
                'last-row': index >= 9
              })}
              onClick={() => !isEmptyKey && handleKeyPress(key)}
            >
              {
                isDelete
                ? (
                  <Icon
                    name="delete"
                    size={22}
                  />
                )
                : (
                  <Text className="key-text">{key}</Text>
                )
              }
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default React.memo(NumberKeyboard)