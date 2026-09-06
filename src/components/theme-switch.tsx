'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { flushSync } from 'react-dom'
import { IconMoonStars, IconSun } from '@tabler/icons-react'

const ThemeSwitch = ({ iconSize = 16 }) => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  // Reserve the row's width before hydration so the masthead doesn't reflow.
  if (!mounted) {
    return <span aria-hidden='true' className='label invisible flex items-center gap-2'><IconSun size={iconSize} /><span className='hidden sm:inline'>light</span></span>
  }

  const toggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark'

    const startViewTransition = (document as any).startViewTransition?.bind(document)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Fallback: no View Transitions API or user prefers reduced motion.
    if (!startViewTransition || reduce) {
      setTheme(next)
      return
    }

    // Reveal the new theme with a circle expanding from the toggle click point.
    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    const transition = startViewTransition(() => {
      flushSync(() => setTheme(next))
    })

    await transition.ready
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 480,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  }

  return (
    <button
      type='button'
      className='label flex cursor-pointer items-center gap-2 transition-colors duration-150 hover:text-ink'
      onClick={toggle}
      aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {resolvedTheme === 'dark' ? <IconMoonStars size={iconSize} /> : <IconSun size={iconSize} />}
      <span className='hidden sm:inline'>{resolvedTheme === 'dark' ? 'dark' : 'light'}</span>
    </button>
  )
}

export default ThemeSwitch
