import React, { useMemo, useEffect, useState } from 'react'
import { View, ITouchEvent } from '@tarojs/components'
import { formatClassNames } from '../../util/function'
import styles from './index.module.styl'

export interface OverlayProps {
  visible: boolean
  zIndex?: number
  duration?: number
  className?: string
  style?: React.CSSProperties
  closeOnOverlayClick?: boolean
  lockScroll?: boolean
  onClick?: (event: ITouchEvent) => void
}

const Overlay: React.FC<OverlayProps> = (props) => {
  const {
    visible = false,
    zIndex = 1000,
    duration = 300,
    className,
    style,
    closeOnOverlayClick = true,
    lockScroll = true,
    onClick,
  } = props

  const [innerVisible, setInnerVisible] = useState(visible)

  useEffect(() => {
    setInnerVisible(visible)
  }, [visible])

  const handleClick = (e: ITouchEvent) => {
    if (closeOnOverlayClick) {
      onClick?.(e)
    }
  }

  const preventTouchMove = (e: any) => {
    if (lockScroll) {
      e.stopPropagation()
      return false
    }
  }

  const combinedStyle: React.CSSProperties = useMemo(() => ({
    ...style,
    zIndex,
    transitionDuration: `${duration}ms`,
    display: innerVisible ? 'block' : 'none'
  }), [style, zIndex, duration, innerVisible])

  return (
    <View
      className={formatClassNames(styles['overlay-root'], className)}
      style={combinedStyle}
      onClick={handleClick}
      catchMove={lockScroll}
      onTouchMove={preventTouchMove}
    />
  )
}

export default Overlay