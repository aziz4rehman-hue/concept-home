import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Fades and lifts its content into view once, when scrolled to. */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section'
}) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}

/** Big serif heading; the second line is set in italic. */
export function SectionTitle({ lines, label }: { lines: readonly string[]; label: string }) {
  return (
    <Reveal>
      <p className="label mb-5">{label}</p>
      <h2 className="h-display text-[clamp(2.5rem,6vw,4.75rem)]">
        {lines[0]} <em className="text-warm">{lines[1]}</em>
      </h2>
    </Reveal>
  )
}
