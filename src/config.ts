import { useState, useEffect } from 'react'

let globalIsDark = false
const listeners = new Set<(isDark: boolean) => void>()

export const setGlobalTheme = (theme: 'light' | 'dark' | string) => {
  globalIsDark = theme === 'dark'
  listeners.forEach((callback) => callback(globalIsDark))
}

export const useTheme = () => {
  const [isDark, setIsDark] = useState(globalIsDark)

  useEffect(() => {
    listeners.add(setIsDark)
    return () => {
      listeners.delete(setIsDark)
    }
  }, [])

  const themeSelect = <T>(lightValue: T, darkValue: T): T => {
    return isDark ? darkValue : lightValue
  }

  return { isDark, themeSelect }
}