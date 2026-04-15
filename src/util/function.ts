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