import React, { useMemo } from 'react'
import { BaseEventOrig, Switch as TaroSwitch } from '@tarojs/components'
import { formatClassNames } from '../../util/function'

import { useTheme } from '../../config'

import styles from './index.module.styl'

export interface SwitchProps {
  /** 是否选中 */
  checked?: boolean
  /** 改变事件 */
  onChange?: (checked: boolean) => void
  /** 是否禁用 */
  disabled?: boolean
  /** 只读状态 */
  readOnly?: boolean
  /** 自定义类名 */
  className?: string
  /** 选中时的背景颜色 (不传则使用主题色) */
  color?: string
}

const Switch: React.FC<SwitchProps> = (props) => {
  const {
    checked = false,
    onChange,
    disabled = false,
    readOnly = false,
    className,
    color,
  } = props

  const { isDark, themeSelect } = useTheme()

  const colors = useMemo(() => {
    let activeTrack = color || 'var(--primary)'
    let inactiveTrack = themeSelect('#CCCCCC', 'var(--containerInner)')

    if (disabled) {
      activeTrack = '#ffc097'
      inactiveTrack = '#E6E6E6'
    }

    return {
      activeTrack,
      inactiveTrack,
    }
  }, [color, disabled, themeSelect])

    const handleChange = (e: BaseEventOrig<{ value: boolean }>) => {
    if (disabled || readOnly) return
    onChange?.(e.detail.value)
  }

  const dynamicStyle = {
    '--switch-active-color': colors.activeTrack,
    '--switch-inactive-color': colors.inactiveTrack,
  } as React.CSSProperties

  return (
    <TaroSwitch
      checked={checked}
      disabled={disabled || readOnly}
      color={colors.activeTrack}
      onChange={handleChange}
      style={dynamicStyle}
      className={formatClassNames(
        styles['switch-component'],
        {
          [styles['is-readonly']]: readOnly,
          [styles['is-disabled']]: disabled,
        },
        className
      )}
    />
  )
}

export default React.memo(Switch)