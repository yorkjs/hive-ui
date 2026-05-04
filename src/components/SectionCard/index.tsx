import React from 'react'
import { View, Text } from '@tarojs/components'
import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'
import Card from '../Card'
import Icon from '../Icon'

export interface SectionCardProps {
  /** 顶部的外置标题（如：4月29日） */
  sectionTitle?: React.ReactNode
  title?: React.ReactNode
  /** 中间多行描述 */
  contents?: React.ReactNode[]
  arrow?: 'right' | 'down' | 'none'
  arrowColor?: string
  /** 底部自定义区域 */
  children?: React.ReactNode
  /** 点击回调 */
  onClick?: () => void
  /** 外部样式类 */
  className?: string
  /** 间距控制属性 */
  showTopGutter?: boolean
  showBottomGutter?: boolean
  showTopBlank?: boolean
}

const SectionCard: React.FC<SectionCardProps> = (props) => {
  const {
    sectionTitle,
    title,
    contents = [],
    children,
    onClick,
    className,
    arrow = 'none',
    arrowColor = 'var(--textPlaceholder)',
    showTopGutter = false,
    showBottomGutter = false,
    showTopBlank = false,
  } = props

  const wrapperClass = formatClassNames(
    styles['section-card-wrapper'],
    {
      [styles['show-top-gutter']]: showTopGutter,
      [styles['show-bottom-gutter']]: showBottomGutter,
      [styles['show-top-blank']]: showTopBlank,
    },
    className
  )

  return (
    <View
      className={wrapperClass}
    >
      {
        sectionTitle
        ? (
          <View
            className={styles['section-header']}
          >
            {
              typeof sectionTitle === 'string'
              ? (<Text>{sectionTitle}</Text>)
              : sectionTitle
            }
          </View>
        )
        : undefined
      }

      <Card
        className={styles['section-card-body']}
      >
        <View
          className={formatClassNames(styles['main-content'], {
            [styles['is-clickable']]: !!onClick
          })}
          onClick={onClick}
        >
          <View
            className={styles['info-body']}
          >
            {
              title
              ? (
                <View
                  className={styles['info-title']}
                >
                  {
                    typeof title === 'string'
                    ? (<Text>{title}</Text>)
                    : title
                  }
                </View>
              )
              : undefined
            }
            {
              contents.map((item, index) => (
                <View
                  key={index}
                  className={styles['info-desc']}
                >
                  {
                    typeof item === 'string'
                    ? (<Text>{item}</Text>)
                    : item
                  }
                </View>
              ))
            }
          </View>

          {
            arrow && arrow !== 'none'
            ? (
              <View
                className={styles['arrow-box']}
              >
                <Icon
                  name={arrow}
                  size={14}
                  color={arrowColor}
                />
              </View>
            )
            : undefined
          }
        </View>

        {
          children
          ? (
            <View
              className={styles['section-footer']}
            >
              {children}
            </View>
          )
          : undefined
        }
      </Card>
    </View>
  )
}

export default React.memo(SectionCard)