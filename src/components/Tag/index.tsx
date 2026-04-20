import React, { useMemo } from 'react'
import { View, Text } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

export type TagType = 'default'
  | 'success'
  | 'info'
  | 'error'
  | 'primary'
  | 'warning'
  | 'light-info'
  | 'light-primary'
  | 'light-success'
  | 'light-error'
  | 'light-warning'

interface TagProps {
  type?: TagType
  text?: string | React.ReactNode
  className?: string
  style?: React.CSSProperties
}
const isDark = false
const Tag: React.FC<TagProps> = ({
  type = 'default',
  text,
  className,
  style
}) => {
  const themeSelect = (light: string, dark: string) => (isDark ? dark : light)

  const tagStyle = useMemo(() => {
    const colors = {
      primary: 'var(--primary)',
      success: 'var(--success)',
      error: 'var(--error)',
      info: 'var(--textTitle)',
      warning: 'var(--warning)',
    }

    const mapping = {
      default: {
        color: 'var(--textTitle)',
        backgroundColor: themeSelect('rgba(255, 255, 255, 0.16)', 'var(--containerInner)'),
      },
      info: {
        color: 'var(--textTitle)',
        backgroundColor: themeSelect('rgba(245, 245, 245, 1)', 'var(--containerInner)'),
      },
      'light-info': {
        color: 'var(--textMuted)',
        backgroundColor: themeSelect('rgba(245, 245, 245, 1)', 'var(--containerMedium)'),
      },
      warning: {
        color: '#FFFFFF',
        backgroundColor: colors.warning,
      },
      'light-warning': {
        color: colors.warning,
        backgroundColor: 'rgba(255,103,0,0.2)',
      },
      primary: {
        color: '#FFFFFF',
        backgroundColor: colors.primary,
      },
      'light-primary': {
        color: colors.primary,
        backgroundColor: 'rgba(255, 103, 0, 0.2)',
      },
      success: {
        color: '#FFFFFF',
        backgroundColor: colors.success,
      },
      'light-success': {
        color: colors.success,
        backgroundColor: 'rgba(3, 190, 2, 0.2)',
      },
      error: {
        color: '#FFFFFF',
        backgroundColor: colors.error,
      },
      'light-error': {
        color: colors.error,
        backgroundColor: 'rgba(255, 49, 65, 0.2)',
      },
    }

    return mapping[type] || mapping.default
  }, [type])

  const finalStyle = useMemo(() => {
    const s: React.CSSProperties & { [key: string]: any } = {
      backgroundColor: tagStyle.backgroundColor,
      color: tagStyle.color,
      ...style,
    }

    if (style?.borderColor) {
      s['--tag-border-color'] = style.borderColor
    }

    return s
  }, [tagStyle, style])

  return (
    <View
      className={formatClassNames(
        styles['tag-component'],
        styles[`type-${type}`],
        className
      )}
      style={finalStyle}
    >
      <Text
        className={styles['tag-text']}
      >
        {text}
      </Text>
    </View>
  )
}

export default Tag
