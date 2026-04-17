import React from 'react'
import { Text } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

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
}

const Icon: React.FC<IconProps> = (props) => {
  const {
    name,
    color,
    size,
    className,
    style,
    onClick
  } = props

  const iconStyle: React.CSSProperties = {
    ...style,
    lineHeight: 1,
    color: color,
    fontSize: typeof size === 'number' ? `${size}PX` : size
  }

  return (
    <Text
      className={formatClassNames(
        'iconfont',
        `icon-${name}`,
        className)
      }
      style={iconStyle}
      onClick={onClick}
    />
  )
}

export default React.memo(Icon)