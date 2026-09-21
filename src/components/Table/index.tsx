import React from 'react'
import { View, Text } from '@tarojs/components'

import { formatClassNames } from '../../util/function'

import styles from './index.module.styl'

export interface TableColumn<T extends object> {
  /** 对应数据字段；同时作为列标识 */
  dataIndex: keyof T
  /** 列标题，支持自定义节点 */
  title: React.ReactNode
  /** 列宽度；数字按 PX 处理，字符串原样使用 */
  width?: number | string
  /**
   * 自定义单元格渲染
   * @param value 当前单元格对应的字段值
   * @param record 当前行数据
   * @param index 当前行索引
   */
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode
}

export type TableTextAlign = 'left' | 'center' | 'right'

export interface TableProps<T extends object> {
  /** 列配置 */
  columns: TableColumn<T>[]
  /** 表格数据源 */
  dataSource: T[]
  /** 行唯一标识对应的数据字段 */
  rowKey: keyof T
  /** 表头背景色 */
  headerBackgroundColor?: string
  /** 表头文字加粗  */
  headerTextBold?: boolean
  /** 表格文字对齐方式 */
  textAlign?: TableTextAlign
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
 * 根据列宽和对齐方式生成单元格样式；未指定宽度时均分剩余空间
 */
function getCellStyle(width?: number | string, align: TableTextAlign = 'left'): React.CSSProperties {
  const formattedWidth = formatWidth(width)
  const justifyContent = align === 'center'
    ? 'center'
    : align === 'right'
      ? 'flex-end'
      : 'flex-start'

  if (formattedWidth) {
    return {
      flex: `0 0 ${formattedWidth}`,
      justifyContent,
      textAlign: align,
    }
  }

  return {
    flex: 1,
    justifyContent,
    textAlign: align,
  }
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
function renderText(
  content: React.ReactNode,
  className: string,
  style?: React.CSSProperties,
) {
  if (typeof content === 'string' || typeof content === 'number') {
    return (
      <Text className={className} style={style}>
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
    headerBackgroundColor,
    headerTextBold = false,
    textAlign = 'left',
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
      <View
        className={styles['table-header']}
        style={headerBackgroundColor ? { background: headerBackgroundColor } : undefined}
      >
        {
          columns.map(column => (
            <View
              key={String(column.dataIndex)}
              className={styles['table-cell']}
              style={getCellStyle(column.width, textAlign)}
            >
              {renderText(
                column.title,
                styles['table-header-text'],
                headerTextBold ? { fontWeight: 500 } : undefined,
              )}
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
                    const value = record[column.dataIndex]
                    const content = column.render
                      ? column.render(value, record, rowIndex)
                      : value

                    return (
                      <View
                        key={`${currentRowKey}-${String(column.dataIndex)}`}
                        className={styles['table-cell']}
                        style={getCellStyle(column.width, textAlign)}
                      >
                        {renderText(
                          content as React.ReactNode,
                          styles['table-cell-text'],
                          { textAlign },
                        )}
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
