import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { useFancyPointer } from '../lib/hooks'

/** Card that tilts gently toward the cursor with a soft light shine. */
export default function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const enabled = useFancyPointer()
  const rx = useSpring(0, { stiffness: 150, damping: 18 })
  const ry = useSpring(0, { stiffness: 150, damping: 18 })
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const shine = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(255,250,240,.38), transparent 45%)`

  return (
    <motion.div
      ref={ref}
      className={`group relative [transform-style:preserve-3d] ${className}`}
      style={enabled ? { rotateX: rx, rotateY: ry, transformPerspective: 900 } : undefined}
      onPointerMove={(e) => {
        if (!enabled || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        ry.set((px - 0.5) * 8)
        rx.set((0.5 - py) * 8)
        mx.set(px * 100)
        my.set(py * 100)
      }}
      onPointerLeave={() => {
        rx.set(0)
        ry.set(0)
      }}
    >
      {children}
      {enabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: shine }}
        />
      )}
    </motion.div>
  )
}
