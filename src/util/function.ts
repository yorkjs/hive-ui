import { pixelRatio } from "./env"

interface ClassRecord {
  [key: string]: boolean | string | number
}

type ClassValue = string | ClassRecord | undefined | null | false

export function formatClassNames(...args: ClassValue[]): string {
  const classes: string[] = []

  args.forEach(arg => {
    if (!arg) return

    if (typeof arg === 'string') {
      classes.push(arg)
    }
    else if (typeof arg === 'object') {
      Object.keys(arg).forEach(key => {
        if (arg[key]) {
          classes.push(key)
        }
      })
    }
  })

  return classes.join(' ')
}

type EmptyString = '' | ' '

// 定义一个包含所有"空"值的联合类型
type EmptyValue = null | undefined | EmptyString | [] | Record<string, never> | typeof NaN

// 空值: {}, [], '', '   ', null, undefined, NaN
export function isEmpty(value: any): value is EmptyValue {
  if (value == null || Number.isNaN(value)) {
    return true
  }

  let isEmpty = false
  const protoType = Object.prototype.toString.call(value)
  switch (protoType) {
    case '[object Object]':
      isEmpty = Object.keys(value).length === 0
      break
    case '[object Array]':
      isEmpty = value.length === 0
      break
    case '[object String]':
      isEmpty = value.trim().length === 0
      break
    default:
      break
  }

  return isEmpty
}

export function formatAssetUrl(url: string, prefix?: string) {
  if (!prefix) {
    prefix = 'https'
  }

  if (!url) {
    return ''
  }

  if (url.indexOf('//') === 0) {
    url = prefix + ':' + url
  }
  else if (url.indexOf('http://img.finstao.com') === 0) {
    url = url.replace(/^http/, 'https')
  }
  return url
}

function  cleanQuery(url: string) {
  if (url && url.split) {
    let terms = url.split('?')
    return terms.length === 2 ? terms[0] : url
  }
  return url
}
function isResponsiveImage(uri: string) {
  return typeof uri === 'string'
    && (uri.indexOf('clouddn') > 0 || uri.indexOf('img.finstao.com') > 0)
}

const imagePixelRatio = Math.min(2, pixelRatio || 2)

export interface IWatermarkOptions {
  text?: string
  gravity?: string
  dissolve?: number
  [key: string]: any
}

export interface IGetResponsiveImageOptions {
  url?: string
  width?: number
  height?: number
  noCrop?: boolean
  quality?: string | number
  supportWebp?: boolean
}

/**
 * 获取响应式图片地址
 */
export default function getResponsiveImage(options: IGetResponsiveImageOptions): string {
  let {
    url,
    width,
    height,
    noCrop,
    quality,
  } = options

  if (!url) return ''

  // 如果不是可缩放类型的图片链接（如 svg/base64），原样返回
  if (!isResponsiveImage(url)) {
    return url
  }

  const suffix: string[] = []

  if (typeof width === 'number') {
    const w = Math.floor(width * imagePixelRatio)
    suffix.push('w', w.toString())
  }

  if (typeof height === 'number') {
    const h = Math.floor(height * imagePixelRatio)
    suffix.push('h', h.toString())
  }

  if (quality) {
    suffix.push('q', quality.toString())
  }

  const hasImageV2 = suffix.length > 0
  let finalUrl = cleanQuery(url)

  if (hasImageV2) {
    const mode = noCrop ? 2 : 1
    finalUrl += `?imageView2/${mode}/${suffix.join('/')}`
  }
  console.log("🚀 ~ getResponsiveImage ~ finalUrl:", finalUrl)

  return formatAssetUrl(finalUrl)
}