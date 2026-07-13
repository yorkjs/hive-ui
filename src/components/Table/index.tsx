import React from 'react'
import { View, Text } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

export interface TableColumn<T extends object> {
  /** 列唯一标识 */
  key: string
  /** 列标题，支持自定义节点 */
  title: React.ReactNode
  /** 对应数据字段；不传时仅通过 render 展示 */
  dataIndex?: keyof T
  /** 列宽度；数字按 PX 处理，字符串原样使用 */
  width?: number | string
  /**
   * 自定义单元格渲染
   * @param value 当前单元格对应的字段值
   * @param record 当前行数据
   * @param index 当前行索引
   */
  render?: (value: T[keyof T] | undefined, record: T, index: number) => React.ReactNode
}

export interface TableProps<T extends object> {
  /** 列配置 */
  columns: TableColumn<T>[]
  /** 表格数据源 */
  dataSource: T[]
  /** 行唯一标识对应的数据字段 */
  rowKey: keyof T
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
}

/**
 * 格式化列宽；数字转为带 PX 的字符串
 */
function formatWidth(width?: number | string) {
  if (width == null) {
    return undefined
  }

  return typeof width === 'number' ? `${width}PX` : width
}

/**
 * 根据列宽生成单元格 flex 样式；未指定宽度时均分剩余空间
 */
function getCellStyle(width?: number | string): React.CSSProperties {
  const formattedWidth = formatWidth(width)

  if (formattedWidth) {
    return { flex: `0 0 ${formattedWidth}` }
  }

  return { flex: 1 }
}

/**
 * 获取行的唯一标识；取不到有效值时回退为行索引
 */
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

/**
 * 渲染文本节点；字符串/数字包一层 Text，其它节点原样返回
 */
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
    dataSource,
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
          dataSource.map((record, rowIndex) => {
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
