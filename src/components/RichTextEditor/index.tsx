import React, { useCallback, useEffect, useMemo, useRef } from 'react'
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

const getNativeTextarea = (instance: any): HTMLTextAreaElement | null => {
  if (!instance) {
    return null
  }

  if (instance.tagName === 'TEXTAREA') {
    return instance
  }

  return instance.querySelector?.('textarea') || instance.textareaRef || null
}

const focusTextarea = (instance: any) => {
  if (!instance) {
    return
  }

  if (typeof instance.focus === 'function') {
    instance.focus()
    return
  }

  getNativeTextarea(instance)?.focus?.()
}

const syncTextareaAutoHeight = (instance: any) => {
  const textarea = getNativeTextarea(instance)
  if (!textarea) {
    return
  }

  textarea.style.overflow = 'hidden'
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`
}

const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
  const {
    value = [],
    onChange,
    placeholder = '请输入内容',
    className,
  } = props

  const { themeSelect } = useTheme()
  const textareaRefs = useRef<Record<number, any>>({})
  const skipHeightSyncRef = useRef(false)

  const deleteIconColor = useMemo(
    () => themeSelect('rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255, 0.5)'),
    [themeSelect]
  )

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
    skipHeightSyncRef.current = true
    updateBlock(index, { content: e.detail.value })

    const eventTarget = (e as any).target
    const textarea = eventTarget?.tagName === 'TEXTAREA'
      ? eventTarget
      : textareaRefs.current[index]
    syncTextareaAutoHeight(textarea)
    requestAnimationFrame(() => {
      syncTextareaAutoHeight(textareaRefs.current[index])
    })
  }, [updateBlock])

  const handleAlignChange = useCallback((index: number, align: RichTextAlign) => {
    updateBlock(index, { align })
  }, [updateBlock])

  const handleTextBlockClick = useCallback((index: number) => {
    focusTextarea(textareaRefs.current[index])
  }, [])

  const handleImageDragStart = useCallback((e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  useEffect(() => {
    if (skipHeightSyncRef.current) {
      skipHeightSyncRef.current = false
      return
    }

    const syncAll = () => {
      value.forEach((block, index) => {
        if (block.type !== 'text') {
          return
        }
        syncTextareaAutoHeight(textareaRefs.current[index])
      })
    }

    const rafId = requestAnimationFrame(syncAll)
    const timer = setTimeout(syncAll, 0)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timer)
    }
  }, [value])

  return (
    <View className={formatClassNames(styles['rich-text-editor'], className)}>
      {value.map((block, index) => (
        <View 
          key={block.id ?? index} 
          className={styles['block']}
        >
          <View
            className={styles['delete-btn']}
            onClick={(e) => handleDelete(e, index)}
          >
            <Icon
              name="close-circle-fill"
              size={17}
              color={deleteIconColor}
            />
          </View>

          {
            block.type === 'text' 
            ? (
              <View
                className={styles['text-block']}
                onClick={() => handleTextBlockClick(index)}
              >
                <View className={styles['textarea-wrap']}>
                  <Textarea
                    ref={(node) => {
                      textareaRefs.current[index] = node
                    }}
                    className={formatClassNames(
                      styles['editor-textarea'],
                      styles[`is-align-${block.align || 'left'}`]
                    )}
                    value={block.content}
                    placeholder={block?.placeholder || placeholder}
                    maxlength={-1}
                    autoHeight
                    disableDefaultPadding
                    onInput={(e) => handleTextChange(index, e)}
                  />
                </View>
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
                  imgProps={{
                    draggable: false,
                    onDragStart: handleImageDragStart,
                  }}
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
