import React, { useState, useMemo, useEffect, useCallback, memo } from 'react'
import { View, Text } from '@tarojs/components'

import { useTheme } from '../../config'
import { formatClassNames } from '../../util/function'

import Icon from '../Icon'

import styles from './index.module.styl'

export type AlertType = 'success' | 'error' | 'primary' | 'warning'

export interface AlertProps {
  message: React.ReactNode
  description?: React.ReactNode
  type?: AlertType
  showIcon?: boolean
  icon?: React.ReactNode
  iconName?: string
  closable?: boolean
  closeText?: React.ReactNode
  onClose?: () => void
  showAnimation?: boolean
  duration?: number
  onClick?: () => void
  showArrow?: boolean
  borderRadius?: number
  className?: string
  messageClassName?: string
  iconClassName?: string

  scroll?: boolean
  scrollSpeed?: number

  clickToClose?: boolean
}

const Alert: React.FC<AlertProps> = ({
  message,
  description,
  type = 'primary',
  showIcon = true,
  icon,
  iconName,
  closable = false,
  closeText,
  onClose,
  showAnimation = false,
  duration = 0,
  onClick,
  showArrow = false,
  borderRadius = 0,
  className,
  messageClassName,
  iconClassName,
  scroll = false,
  scrollSpeed = 17,
  clickToClose = false
}) => {

  const { themeSelect } = useTheme()

  const [visible, setVisible] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)

  const config = useMemo(() => {

    const mapping = {
      warning: {
        icon: 'exclamation-circle-fill',
        color: '#FA8C16',
        bg: themeSelect('#FFF7E6', 'rgba(255,153,0,0.25)')
      },
      success: {
        icon: 'check-circle-fill',
        color: '#03BE02',
        bg: themeSelect('#E9FFE9', 'rgba(3, 190, 2, 0.30)')
      },
      error: {
        icon: 'close-circle-fill',
        color: '#FF3141',
        bg: themeSelect('#FFE5E7', 'rgba(255, 49, 65, 0.3)')
      },
      primary: {
        icon: 'volume-up',
        color: 'var(--primary)',
        bg: themeSelect('#FFF7E6', 'rgba(255, 143, 31, 0.3)')
      },
    }

    return mapping[type] || mapping.primary
  }, [type])

  const handleClose = useCallback(() => {
    if (showAnimation) {
      setIsLeaving(true)
      setTimeout(() => {
        setVisible(false)
        onClose?.()
      }, 250)
    }
    else {
      setVisible(false)
      onClose?.()
    }
  }, [showAnimation, onClose])

  const handleContainerClick = () => {
    if (clickToClose) {
      handleClose()
    }

    onClick?.()
  }

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(handleClose, duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, handleClose])

  if (!visible) return null

  return (
    <View
      className={formatClassNames(styles['alert-container'], className, {
        [styles['is-pressable']]: !!onClick,
        [styles['show-animation']]: showAnimation,
        [styles['is-leaving']]: isLeaving
      })}
      style={{
        backgroundColor: config.bg,
        borderRadius: borderRadius ? `${borderRadius}PX` : '0'
      }}
      onClick={handleContainerClick}
    >

      <View className={styles['alert-content']}>

        {
          showIcon
          ? (
            <View className={formatClassNames(styles['icon-wrapper'], iconClassName)}>
              {
                icon
                  ? icon
                  : (
                    <Icon
                      name={iconName || config.icon}
                      color={config.color}
                      size={16}
                    />
                  )
              }
            </View>
          )
          : undefined
        }

        <View className={styles['text-container']}>

          {typeof message === 'string' ? (

            scroll ? (

              <View className={styles['scroll-wrapper']}>

                <View
                  className={styles['scroll-track']}
                  style={{ animationDuration: `${scrollSpeed}s` }}
                >

                  <Text
                    className={formatClassNames(styles['scroll-text'], messageClassName)}
                    style={{ color: config.color }}
                  >
                    {message}
                  </Text>

                  <Text
                    className={formatClassNames(styles['scroll-text'], messageClassName)}
                    style={{ color: config.color }}
                  >
                    {message}
                  </Text>

                </View>

              </View>

            ) : (

              <Text
                className={formatClassNames(styles['message-text'], messageClassName)}
                style={{ color: config.color }}
              >
                {message}
              </Text>

            )

          ) : message}

          {description && (
            <View className={styles['description-wrapper']}>
              {
                typeof description === 'string'
                ? (
                  <Text
                    className={styles['description-text']}
                    style={{ color: 'var(--content)' }}
                  >
                    {description}
                  </Text>
                )
                : description
              }
            </View>
          )}

        </View>

        <View className={styles['action-container']}>

          {closable && (
            <View
              className={styles['close-btn-wrapper']}
              onClick={(e) => {
                e.stopPropagation()
                handleClose()
              }}
            >
              {
                closeText
                ? (
                  <Text className={styles['close-text']} style={{ color: config.color }}>
                    {closeText}
                  </Text>
                )
                : (
                  <Icon
                    name="close"
                    color={config.color}
                    size={14}
                  />
                )
              }
            </View>
          )}

          {(showArrow || (!showArrow && onClick)) && !closable && (
            <Icon
              name="right"
              color={config.color}
              size={12}
            />
          )}

        </View>

      </View>

    </View>
  )
}

export default memo(Alert)
