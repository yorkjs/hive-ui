import React from 'react'
import { View, Text } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

export interface TableColumn<T extends object> {
  /** 列唯一标识 */
  key: string
  /** 对应数据字段；不传时仅通过 render 展示 */
  dataIndex?: keyof T
  title: React.ReactNode
  width?: number | string
  /** 自定义渲染内容 */
  render?: (value: T[keyof T] | undefined, record: T, index: number) => React.ReactNode
}

export interface TableProps<T extends object> {
  /** 表头 */
  columns: TableColumn<T>[]
  /** 数据 */
  data: T[]
  /** 行唯一标识的 key */
  rowKey: keyof T
  className?: string
  style?: React.CSSProperties
}

function formatWidth(width?: number | string) {
  if (width == null) {
    return undefined
  }

  return typeof width === 'number' ? `${width}PX` : width
}

function getCellStyle(width?: number | string): React.CSSProperties {
  const formattedWidth = formatWidth(width)

  if (formattedWidth) {
    return { flex: `0 0 ${formattedWidth}` }
  }

  return { flex: 1 }
}

function getRowKey<T extends object>(
  record: T,
  index: number,
  rowKey: keyof T,
): string | number {
  const key = record[rowKey]

  if (key == null) {
    return index
  }

  if (typeof key === 'string' || typeof key === 'number') {
    return key
  }

  return String(key)
}

function renderText(content: React.ReactNode, className: string) {
  if (typeof content === 'string' || typeof content === 'number') {
    return (
      <Text className={className}>
        {content}
      </Text>
    )
  }

  return content
}

function Table<T extends object>(props: TableProps<T>) {
  const {
    data,
    columns,
    rowKey,
    className,
    style,
  } = props

  if (!columns.length) {
    return null
  }

  return (
    <View
      className={formatClassNames(styles['table'], className)}
      style={style}
    >
      <View className={styles['table-header']}>
        {
          columns.map(column => (
            <View
              key={column.key}
              className={styles['table-cell']}
              style={getCellStyle(column.width)}
            >
              {renderText(column.title, styles['table-header-text'])}
            </View>
          ))
        }
      </View>

      <View className={styles['table-body']}>
        {
          data.map((record, rowIndex) => {
            const currentRowKey = getRowKey(record, rowIndex, rowKey)

            return (
              <View
                key={currentRowKey}
                className={styles['table-row']}
              >
                {
                  columns.map(column => {
                    const value = column.dataIndex != null
                      ? record[column.dataIndex]
                      : undefined
                    const content = column.render
                      ? column.render(value, record, rowIndex)
                      : value

                    return (
                      <View
                        key={`${currentRowKey}-${column.key}`}
                        className={styles['table-cell']}
                        style={getCellStyle(column.width)}
                      >
                        {renderText(content as React.ReactNode, styles['table-cell-text'])}
                      </View>
                    )
                  })
                }
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default React.memo(Table) as typeof Table
