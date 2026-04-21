import React from 'react'
import { View } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import CellTitle from './CellTitle'
import CellValue from './CellValue'
import CellArrow from './CellArrow'

import styles from './index.module.styl'

export interface CellProps {
  vertical?: boolean
  icon?: React.ReactNode
  title?: React.ReactNode | string
  placeholder?: string | number
  value?: string | number
  content?: React.ReactNode
  titleWidth?: number
  tooltip?: string
  required?: boolean
  showArrow?: boolean
  showSeparator?: boolean
  showTopBorder?: boolean
  showBottomBorder?: boolean
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

const Cell: React.FC<CellProps> = (props) => {
  const {
    vertical = false,
    icon,
    title,
    placeholder,
    value,
    content,
    titleWidth,
    tooltip,
    required = false,
    showArrow = false,
    showSeparator = false,
    showTopBorder = false,
    showBottomBorder = false,
    onClick,
    className,
    children
  } = props

  const containerClass = formatClassNames(
    styles['cell-container'],
    vertical ? styles['is-vertical'] : styles['is-horizontal'],
    {
      [styles['is-clickable']]: !!onClick,
      [styles['border-top']]: showTopBorder,
      [styles['border-bottom']]: showBottomBorder,
    },
    className
  )

  const innerClass = formatClassNames(styles['cell-inner'], {
    [styles['show-separator']]: showSeparator,
  })

  const renderContent = () => {
    if (content) return content
    if (value != null || placeholder != null) {
      return (
        <CellValue
          value={value}
          placeholder={placeholder}
        />
      )
    }
    return null
  }

  return (
    <View className={containerClass} onClick={onClick}>
      <View className={innerClass}>
        <View className={styles['cell-main']}>
          {
            vertical ? (
              <>
                <View className={styles['header-row']}>
                  <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1
                  }}>
                    {
                      icon
                      ? (
                        <View className={styles['icon-wrapper']}>
                          {icon}
                        </View>
                      ) : undefined
                    }
                    <View className={styles['title-section']}>
                      {
                        typeof title === 'string'
                        ? <CellTitle title={title} required={required} tooltip={tooltip} />
                        : title
                      }
                    </View>
                  </View>
                  {
                    showArrow
                    ? <View className={styles['arrow-wrapper']}><CellArrow /></View>
                    : undefined
                  }
                </View>
                <View className={styles['content-section']}>
                  {renderContent()}
                </View>
              </>
            )
            : (
              <>
                {
                  icon
                  ? <View className={styles['icon-wrapper']}>{icon}</View>
                  : undefined
                }
                <View
                  className={styles['title-section']}
                  style={titleWidth ? { width: `${titleWidth}px` } : { maxWidth: '60%' }}
                >
                  {
                    typeof title === 'string'
                    ? <CellTitle title={title} required={required} tooltip={tooltip} />
                    : title
                  }
                </View>
                <View className={styles['content-section']}>
                  {renderContent()}
                </View>
                {
                  showArrow
                  ? <View className={styles['arrow-wrapper']}><CellArrow /></View>
                  : undefined
                }
              </>
            )
          }
        </View>
        {
          children
          ? (
            <View
              className={styles['cell-extra-children']}
            >
              {children}
            </View>
          )
          : undefined
          }
      </View>
    </View>
  )
}

export default Cell
