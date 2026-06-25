import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import { View } from '@tarojs/components'

import Overlay from '../Overlay'
import Icon from '../Icon'
import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

export interface SimpleModalProps {
  /** 是否显示 */
  visible: boolean
  /** 关闭回调 */
  onClose: () => void
  /** 弹窗内容 */
  children?: React.ReactNode
  /** 自定义内容区类名 */
  className?: string
  /** 点击遮罩层是否关闭 */
  closeOnOverlayClick?: boolean
}

const SimpleModal: React.FC<SimpleModalProps> = (props) => {
  const {
    visible,
    onClose,
    children,
    className,
    closeOnOverlayClick = true
  } = props

  if (!visible) return null

  const stopPropagation = (e: any) => {
    e.stopPropagation()
  }

  useEffect(() => {
    if (visible && Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
        document.body.style.overflow = 'auto'
      }
    }
  }, [visible])

  return (
    <View className={styles['simple-modal-root']}
      catchMove
      onTouchMove={stopPropagation}
    >
      <Overlay
        visible={visible}
        onClick={() => closeOnOverlayClick && onClose()}
      />

      <View className="modal-main-wrapper">

        <View className={formatClassNames('modal-content-box', className)}>
          {children}
        </View>

        <View className="modal-close-section" onClick={onClose}>
          <View className="close-line" />
          <View className="close-circle-btn">
            <Icon name="close-circle" size={33} color="#fff" />
          </View>
        </View>

      </View>
    </View>
  )
}

export default SimpleModal