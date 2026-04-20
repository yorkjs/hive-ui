import React, { useMemo } from 'react'
import { View, Text } from '@tarojs/components'

import { isAndroid, isApp } from '../../util/env'
import { formatClassNames } from '../../util/function'

import Icon from '../Icon'

import styles from './index.module.styl'

export interface CheckboxProps {
  label?: string
  checked: boolean
  disabled?: boolean
  readOnly?: boolean
  size?: 'normal' | 'large' | 'small'
  onChange?: (checked: boolean) => void
  className?: string
}

const isDark = false

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const {
    label,
    checked = false,
    disabled = false,
    readOnly = false,
    size = 'normal',
    onChange,
    className,
  } = props

  const handlePress = (e: any) => {
    if (disabled || readOnly) return
    onChange?.(!checked)
  }

  const iconSize = size === 'large' ? 36 : (size === 'small' ? 16 : 20)

  const getIconColor = () => {
    if (disabled) return 'var(--extraColor)'
    if (checked) return 'var(--primary)'
    return isDark ? '#ffffff' : 'var(--textPlaceholder)'
  }

  const iconName = checked ? 'check-circle-fill' : 'circle'

  const iconNode = (
    <Icon
      name={iconName}
      size={`${iconSize}PX`}
      color={getIconColor()}
    />
  )

  const iconElement = useMemo(() => {
    if (disabled) {
      return (
        <View
          style={{
            width: `${iconSize}PX`,
            height: `${iconSize}PX`,
            borderRadius: `${iconSize / 2}PX`,
            backgroundColor: 'var(--containerInner)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box'
          }}
        >
          <Icon
            name={iconName}
            size={`${iconSize}PX`}
            color={checked ? 'var(--extraColor)' : 'var(--textPlaceholder)'}
          />
        </View>
      )
    }
    return iconNode
  }, [disabled, checked, iconName, iconSize])

  return (
    <View
      onClick={handlePress}
      className={formatClassNames(
        styles['checkbox-component'],
        {
          [styles['is-checked']]: checked,
          [styles['is-disabled']]: disabled,
          [styles['size-large']]: size === 'large',
          [styles['size-small']]: size === 'small',
        },
        className
      )}
    >
      <View className={styles['checkbox-icon-container']}>
        {iconElement}
      </View>

      {/* TODO: 临时解决 app 上 Android文字偏上对齐问题 */}
      {label && (
        <Text
          className={formatClassNames(
            styles['label-text'],
            {
              [styles['is-app-android']]: !!(isApp && isAndroid)
            }
          )}
        >
          {label}
        </Text>
      )}
    </View>
  )
}

export default React.memo(Checkbox)
