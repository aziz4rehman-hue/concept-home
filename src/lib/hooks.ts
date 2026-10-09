import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

/** True on devices with a real mouse and no reduced-motion preference. */
export function useFancyPointer() {
  const hover = useMedia('(hover: hover) and (pointer: fine)')
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  return hover && !reduced
}

/** Scroll to a section on the home page, navigating there first if needed. */
export function useGoTo() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (id: string) => {
    if (pathname === '/') document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    else navigate('/', { state: { scrollTo: id } })
  }
}

export function waLink(text: string) {
  return `https://wa.me/923125445484?text=${encodeURIComponent(text)}`
}
