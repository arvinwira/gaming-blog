'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full animate-pulse" />
  }

  return (
    <button
      type="button"
      aria-label={`Activate ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Activate ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      className="p-2 w-10 h-10 flex items-center justify-center rounded-full hover:opacity-80"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
