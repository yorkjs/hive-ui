import React, { useMemo } from 'react'
import { Text } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

interface HitSlop {
  top?: number
  right?: number
  bottom?: number
  left?: number
}

interface IconProps {
  /** 图标名称，对应 iconfont 中的类名后缀 */
  name: string
  /** 图标颜色 */
  color?: string
  /** 图标大小，默认单位为 PX */
  size?: number | string
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
  /** 点击事件 */
  onClick?: (event: any) => void
  /** 扩大选区*/
  hitSlop?: number | HitSlop
}

const Icon: React.FC<IconProps> = (props) => {
  const {
    name,
    color,
    size,
    className,
    style,
    hitSlop,
    onClick
  } = props

  const hitSlopVars = useMemo(() => {
    if (!hitSlop) return {}
    const { top = 0, right = 0, bottom = 0, left = 0 } =
      typeof hitSlop === 'number'
        ? { top: hitSlop, right: hitSlop, bottom: hitSlop, left: hitSlop }
        : hitSlop

    return {
      '--hit-slop-top': `-${top}px`,
      '--hit-slop-right': `-${right}px`,
      '--hit-slop-bottom': `-${bottom}px`,
      '--hit-slop-left': `-${left}px`,
    }
  }, [hitSlop])

  const iconStyle: React.CSSProperties = {
    ...style,
    ...hitSlopVars,
    lineHeight: 1,
    color: color,
    fontSize: typeof size === 'number' ? `${size}PX` : size
  }

  return (
    <Text
      className={formatClassNames(
        'iconfont',
        `icon-${name}`,
        hitSlop ? styles['has-hitSlop'] : '',
        className)
      }
      style={iconStyle}
      onClick={onClick}
    />
  )
}

export default React.memo(Icon)