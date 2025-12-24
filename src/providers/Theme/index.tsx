'use client'

import React, { createContext, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'
import { defaultTheme, getImplicitPreference, themeLocalStorageKey } from './shared'
const initialContext: ThemeContextType = {
  theme: undefined,
  setTheme: () => {},
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme | undefined>('light')

  const applyTheme = (t: Theme) => {
    document.documentElement.setAttribute('data-theme', t)
    setThemeState(t)
  }

  const setTheme = (t: Theme | null) => {
    if (t === null) {
      const implicit = getImplicitPreference()
      const resolved = implicit ?? defaultTheme
      window.localStorage.setItem(themeLocalStorageKey, 'auto')
      applyTheme(resolved)
      return
    }

    window.localStorage.setItem(themeLocalStorageKey, t)
    applyTheme(t)
  }

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(themeLocalStorageKey)
      if (saved === 'dark' || saved === 'light') {
        applyTheme(saved)
      } else if (saved === 'auto') {
        const implicit = getImplicitPreference()
        applyTheme(implicit ?? defaultTheme)
      } else {
        applyTheme(defaultTheme)
      }
    } catch {
      applyTheme(defaultTheme)
    }
  }, [])

  return <ThemeContext.Provider value={{ setTheme, theme }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
