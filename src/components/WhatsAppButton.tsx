import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { waLink } from '../lib/hooks'

export default function WhatsAppButton() {
  const [hidden, setHidden] = useState(false)
  const { pathname } = useLocation()

  // Step aside while the contact form is on screen so it never covers the Send button.
  useEffect(() => {
    const form = document.getElementById('contact')
    if (!form) {
      setHidden(false)
      return
    }
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.25 })
    io.observe(form)
    return () => io.disconnect()
  }, [pathname])

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.a
          href={waLink('Hello Concept Home Interior, I would like to ask about custom furniture.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(43,31,23,.45)] sm:bottom-7 sm:right-7"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, type: 'spring', stiffness: 260, damping: 18 } }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
        >
          <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
            <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.2.6 4.4 1.7 6.3L3 29l7.3-1.9c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.7 12.7-12.6C28.8 8.6 23 3 16 3zm0 23.2c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.3 1.1 1.2-4.2-.3-.4a10.4 10.4 0 0 1-1.6-5.5C5.3 9.8 10.1 5.2 16 5.2s10.6 4.6 10.6 10.4S21.9 26.2 16 26.2zm5.8-7.8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.7c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 2.1.9 3 1 4 .8.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
