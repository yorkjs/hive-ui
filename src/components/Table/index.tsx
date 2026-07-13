import React, { FC } from 'react'
import { View, Text } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

export interface TableColumn<T extends object> {
  key: keyof T
  title: React.ReactNode
  width?: number | string
  // 自定义渲染内容
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode
}

export interface TableProps<T extends object> {
  /** 表头 */
  columns: TableColumn<T>[]
  /** 数据 */
  data: T[]
  /** 行唯一标识的 key */
  rowKey: keyof T
  className?: string
}

function formatWidth(width?: number | string) {
  if (width == null) {
    return undefined
  }

  return typeof width === 'number' ? `${width}PX` : width
}

function getCellStyle(width?: number | string) {
  const formattedWidth = formatWidth(width)

  if (formattedWidth) {
    return { flex: `0 0 ${formattedWidth}` }
  }

  return { flex: 1 }
}

function normalizeRowKey(key: React.Key, index: number): string | number {
  if (typeof key === 'bigint') {
    return String(key)
  }

  if (key == null) {
    return index
  }

  return key
}

/**
 * 获取行的唯一标识
 */
function getRowKey<T extends object>(
  record: T,
  index: number,
  rowKey: keyof T,
): string | number {
  const key = record[rowKey]

  if (key != null) {
    return normalizeRowKey(key as React.Key, index)
  }

  return index
}

/**
 *按照 columns 中的 key 获取单元格的值
 */
function getCellValue<T extends object, K extends keyof T>(
  record: T,
  key: K,
): T[K] {
  return record[key]
}

function renderCellContent(content: unknown) {
  if (typeof content === 'string' || typeof content === 'number') {
    return (
      <Text className={styles['cell-text']}>
        {content}
      </Text>
    )
  }

  return content as React.ReactNode
}

function renderHeaderTitle(title: React.ReactNode) {
  if (typeof title === 'string' || typeof title === 'number') {
    return (
      <Text className={styles['header-text']}>
        {title}
      </Text>
    )
  }

  return title
}

const Table: FC<TableProps<any>> = (props) => {
  const {
    data,
    columns,
    rowKey,
    className,
  } = props

  if (!columns.length || !data?.length) {
    return null
  }

  return (
    <View
      className={formatClassNames(styles['table'], className)}
    >
      <View className={styles['header']}>
        {
          columns.map(column => (
            <View
              key={String(column.key)}
              className={styles['cell']}
              style={getCellStyle(column.width)}
            >
              {renderHeaderTitle(column.title)}
            </View>
          ))
        }
      </View>

      <View className={styles['body']}>
        {
          data.map((record, rowIndex) => {
            const currentRowKey = getRowKey(record, rowIndex, rowKey)

            return (
              <View
                key={currentRowKey}
                className={styles['row']}
              >
                {
                  columns.map(column => {
                    const value = getCellValue(record, column.key)
                    const content = column.render
                      ? column.render(value, record, rowIndex)
                      : value

                    return (
                      <View
                        key={`${currentRowKey}-${String(column.key)}`}
                        className={styles['cell']}
                        style={getCellStyle(column.width)}
                      >
                        {renderCellContent(content)}
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

export default React.memo(Table)
