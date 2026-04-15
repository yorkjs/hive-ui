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