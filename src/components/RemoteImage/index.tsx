import React, { useMemo } from 'react'
import { Image, ImageProps } from '@tarojs/components'

import getResponsiveImage from '../../util/function'

export interface IRemoteImageProps extends Omit<ImageProps, 'src'> {
  /** 图片地址 */
  url: string
  /** 期望显示宽度 */
  width?: number
  /** 期望显示高度 */
  height?: number
  /** 是否不进行裁剪（等比缩放） */
  noCrop?: boolean
  /** 图片质量 1-100 */
  quality?: string | number
  /** 自定义样式类 */
  className?: string
}

const RemoteImage: React.FC<IRemoteImageProps> = (props) => {
  const {
    url,
    width = 50,
    height = 50,
    noCrop = false,
    quality,
    mode = 'aspectFill',
    className,
    ...restProps
  } = props

  const responsiveSrc = useMemo(() => {
    return getResponsiveImage({
      url,
      width,
      height,
      noCrop,
      quality,
    })
  }, [url, width, height, noCrop, quality])
  console.log("🚀 ~ RemoteImage ~ responsiveSrc:", responsiveSrc)

  const containerStyle: React.CSSProperties = {
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
  }

  return (
    <Image
      className={className}
      src={responsiveSrc}
      mode={mode}
      style={containerStyle}
      {...restProps}
    />
  )
}

export default React.memo(RemoteImage)