import React, { useCallback, useMemo } from 'react'
import { View, Textarea, Image, BaseEventOrig, ITouchEvent } from '@tarojs/components'

import { useTheme } from '../../config'
import { formatClassNames } from '../../util/function'
import Icon from '../Icon'

import styles from './index.module.styl'

/** 文本对齐方式 */
export type RichTextAlign = 'left' | 'center' | 'right'

export type RichTextBlockType = 'text' | 'image'

interface RichTextBlockBase {
  /** 可选唯一标识 ，便于后续排序等扩展；未传时用下标 */
  id?: string
}

/** 文本块 */
export interface RichTextTextBlock extends RichTextBlockBase {
  type: 'text'
  /** 文本内容 */
  content: string
  /** 对齐方式，默认 left */
  align?: RichTextAlign
  placeholder?: string
}

/** 图片块 */
export interface RichTextImageBlock extends RichTextBlockBase {
  type: 'image'
  /** 图片地址 */
  url: string
}

export type RichTextBlock = RichTextTextBlock | RichTextImageBlock

export interface RichTextEditorProps {
  /** 块列表（受控） */
  value?: RichTextBlock[]
  /** 内容变更 */
  onChange?: (value: RichTextBlock[]) => void
  /** 文本占位符 */
  placeholder?: string
  /** 自定义类名 */
  className?: string
}

const ALIGN_OPTIONS: RichTextAlign[] = ['left', 'center', 'right']

const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  const {
    value = [],
    onChange,
    placeholder = '请输入内容',
    className,
  } = props

  const { themeSelect } = useTheme()

  const deleteBtnStyle = useMemo(() => ({
    backgroundColor: themeSelect('rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255, 0.5)'),
  }), [themeSelect])

  const updateBlock = useCallback((index: number, patch: Partial<RichTextBlock>) => {
    onChange?.(
      value.map((block, i) => (i === index ? { ...block, ...patch } as RichTextBlock : block))
    )
  }, [value, onChange])

  const handleDelete = useCallback((e: ITouchEvent, index: number) => {
    e.stopPropagation()
    onChange?.(value.filter((_, i) => i !== index))
  }, [value, onChange])

  const handleTextChange = useCallback((
    index: number,
    e: BaseEventOrig<{ value: string }>
  ) => {
    updateBlock(index, { content: e.detail.value })
  }, [updateBlock])

  const handleAlignChange = useCallback((index: number, align: RichTextAlign) => {
    updateBlock(index, { align })
  }, [updateBlock])

  return (
    <View className={formatClassNames(styles['rich-text-editor'], className)}>
      {value.map((block, index) => (
        <View 
          key={block.id ?? index} 
          className={styles['block']}
        >
          <View
            className={styles['delete-btn']}
            style={deleteBtnStyle}
            onClick={(e) => handleDelete(e, index)}
          >
            <Icon
              name='close'
              size={10}
              color="var(--containerCard)"
              className={styles['delete-icon']}
            />
          </View>

          {
            block.type === 'text' 
            ? (
              <View className={styles['text-block']}>
                <Textarea
                  className={formatClassNames(
                    styles['editor-textarea'],
                    styles[`is-align-${block.align || 'left'}`]
                  )}
                  value={block.content}
                  placeholder={block?.placeholder || placeholder}
                  maxlength={-1}
                  autoHeight
                  onInput={(e) => handleTextChange(index, e)}
                />
                <View className={styles['align-toolbar']}>
                  {ALIGN_OPTIONS.map((align) => {
                    const active = (block.align || 'left') === align
                    const disabled = !block.content?.trim()
                    return (
                      <View
                        key={align}
                        className={formatClassNames(
                          styles['align-btn'],
                          disabled ? styles['is-disabled'] : ''
                        )}
                        onClick={() => {
                          if (disabled) return
                          handleAlignChange(index, align)
                        }}
                      >
                        <Icon
                          name={`align-${align}`}
                          size={16}
                          color={disabled
                            ? 'var(--textMuted)'
                            : active ? 'var(--textTitle)' : 'var(--textMuted)'}
                        />
                      </View>
                    )
                  })}
                </View>
              </View>
            ) 
            : (
              <View className={styles['image-block']}>
                <Image
                  className={styles['image']}
                  src={block.url}
                  mode='widthFix'
                />
              </View>
            )
          }
        </View>
      ))}
    </View>
  )
}

export default React.memo(RichTextEditor)
