import { FC, useMemo } from 'react'
import { View, Text } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

export interface ProgressProps {
  /**
   * 百分比
   * @default 0
   */
  percent?: number
  /**
   * 进度条背景颜色
   * @default #f3f3f3
   */
  background?: string
  /**
   * 进度条线条颜色
   * @default linear-gradient(135deg, #fa2c19 0%, #fa6419 100%)
   */
  color?: string
  /**
   * 进度条宽度
   */
  strokeWidth?: string
  /**
   * 是否显示文字内容
   * @default false
   */
  showText?: boolean
  /**
   * 百分比文字是否外显（在进度条右侧）
   * @default false
   */
  textOutside?: boolean
  /**
   * 是否展示动画效果
   * @default false
   */
  animated?: boolean
  /**
   * 自定义类名
   */
  className?: string
}

const Progress: FC<ProgressProps> = ({
  percent = 0,
  background = 'var(--containerInner)',
  color = 'linear-gradient(135deg, #fa2c19 0%, #fa6419 100%)',
  strokeWidth = 10,
  showText = false,
  textOutside = false,
  animated = false,
  className = '',
}) => {
  // 限制百分比在 0-100 之间，最多保留两位小数
  const validPercent = useMemo(() => {
    const p = Math.min(100, Math.max(0, percent))
    return Math.round(p * 100) / 100
  }, [percent])

  const trackStyle: React.CSSProperties = {
    height: `${strokeWidth}px`,
    backgroundColor: background,
    borderRadius: `${strokeWidth}px`,
  }

  const fillStyle: React.CSSProperties = {
    width: `${validPercent}%`,
    height: `${strokeWidth}px`,
    borderRadius: `${strokeWidth}px`,
    background: color,
  }

  const textStyle: React.CSSProperties = textOutside
    ? { marginLeft: '8px' }
    : { right: `${100 - validPercent}%` }

  const textInnerStyle: React.CSSProperties = textOutside
    ? { color: 'var(--textTitle' }
    : { background: color }

  return (
    <View 
      className={
        formatClassNames(
          styles.progress,
          className
        )
      }
    >
      <View 
        className={styles.track} 
        style={trackStyle}
      >
        <View className={styles.fill} style={fillStyle}>
          {
            animated 
            ?
              <View className={styles.shimmer} />
            : null
          }
        </View>

        {
          (showText && !textOutside) 
            ? (
              <View 
                className={styles.text} 
                style={textStyle}
              >
                <Text 
                  className={styles.textInner} 
                  style={textInnerStyle}
                >
                  {validPercent}%
                </Text>
              </View>
            )
            : null
        }
      </View>

      {
        (showText && textOutside) 
          ? (
            <View 
              className={styles.textOutside} 
              style={textStyle}
            >
              <Text 
                className={styles.textInner} 
                style={textInnerStyle}
              >
                {validPercent}%
              </Text>
            </View>
          ) 
          : null
      }
    </View>
  )
}

export default Progress
