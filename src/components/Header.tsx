import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { nav } from '../content'
import { useGoTo } from '../lib/hooks'
import Logo from './Logo'
import Magnetic from './Magnetic'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const goTo = useGoTo()
  const navigate = useNavigate()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const go = (item: (typeof nav)[number]) => {
    setOpen(false)
    if ('page' in item) navigate(item.page)
    else goTo(item.id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-sand/85 py-3 shadow-[0_1px_0_rgba(43,31,23,.08)] backdrop-blur-md' : 'py-5'
      }`}
    >
      <div className="container-x flex items-center justify-between">
        <Link to="/" aria-label="Concept Home Interior – home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item)}
              className="relative text-[14px] tracking-wide text-walnut/80 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:text-walnut hover:after:w-full"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block">
            <Magnetic>
              <button onClick={() => goTo('contact')} className="btn btn-primary !py-2.5 !text-[14px]">
                Get a quote
              </button>
            </Magnetic>
          </span>
          <button
            className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-px w-6 bg-walnut transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-walnut transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-sand px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {nav.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => go(item)}
                  className="h-display border-b border-walnut/10 py-4 text-left text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
            <button onClick={() => go({ id: 'contact', label: 'Contact' })} className="btn btn-primary mt-auto w-full">
              Get a quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
