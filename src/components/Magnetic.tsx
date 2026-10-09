import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { useFancyPointer } from '../lib/hooks'

/** Wrapper that makes its child drift slightly toward the cursor. */
export default function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const enabled = useFancyPointer()
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15, mass: 0.4 })

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (!enabled || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}
