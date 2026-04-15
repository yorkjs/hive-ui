import React, { useMemo } from 'react'
import { View, Text, Image } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

type KeyboardType = 'int' | 'number'

interface IProps {
  /** 键盘类型：int(整数), number(带小数点) */
  type?: KeyboardType
  /** 插入字符回调 */
  onInsert: (val: string) => void
  /** 删除回调 */
  onDelete: () => void
  /** 是否显示头部状态栏 */
  showHead?: boolean
  /** 完成按钮文案 */
  doneText?: string
  /** 完成按钮点击 */
  onDone?: () => void
  /** 外部样式名 */
  className?: string
}

const NumberKeyboard: React.FC<IProps> = (props) => {
  const {
    type = 'int',
    onInsert,
    onDelete,
    showHead = false,
    doneText = '完成',
    onDone,
    className
  } = props

  const keys = useMemo(() => {
    const leftBottomKey = type === 'number' ? '.' : ''
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9', leftBottomKey, '0', 'delete']
  }, [type])

  const handleKeyPress = (key: string) => {
    if (key === 'delete') {
      onDelete()
    }
    else if (key !== '') {
      onInsert(key)
    }
  }

  return (
    <View className={formatClassNames(styles['number-keyboard-component'], className)}>
      {
        showHead
        ? (
          <View className="keyboard-header">
            <View className="header-placeholder" />
            <View className="done-btn" onClick={onDone}>
              <Text className="done-text">{doneText}</Text>
            </View>
          </View>
        ) : undefined
      }

      <View className={"keyboard-grid"}>
        {keys.map((key, index) => {
          const isDelete = key === 'delete'
          const isEmptyKey = key === '' && type === 'int'

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
                  <Image
                    className="delete-icon"
                    src="https://img.finstao.com/3ccf71a6e53be5a99c02b0dd7e9ed8c0.png"
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