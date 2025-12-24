'use client'

import type { Theme } from '@/providers/Theme/types'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

export interface ContextType {
  headerTheme?: Theme | null
  setHeaderTheme: (theme: Theme | null) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Start with null so SSR and first client render match; populate after mount.
  const [headerTheme, setThemeState] = useState<Theme | null>(null)

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as Theme | null
    if (current) setThemeState(current)
  }, [])

  const setHeaderTheme = useCallback((themeToSet: Theme | null) => {
    setThemeState(themeToSet)
  }, [])

  return <HeaderThemeContext value={{ headerTheme, setHeaderTheme }}>{children}</HeaderThemeContext>
}

export const useHeaderTheme = (): ContextType => use(HeaderThemeContext)
