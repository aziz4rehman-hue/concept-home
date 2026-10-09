import { motion } from 'framer-motion'

const houses = [
  { d: 'M56 26 84 0l28 26v84H56z', fill: 'var(--color-house-3)', opacity: 1 },
  { d: 'M28 30 56 6l28 24v80H28z', fill: 'var(--color-house-2)', opacity: 0.9 },
  { d: 'M0 32 28 8l28 24v78H0zm16 30v48h22V62z', fill: 'var(--color-house-1)', opacity: 0.92 },
]

/** Brand mark: three overlapping houses that "build" one by one, plus the wordmark. */
export default function Logo({ compact = false, animate = true }: { compact?: boolean; animate?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 -2 112 112" className={compact ? 'h-8 w-8' : 'h-10 w-10'} aria-hidden="true">
        {/* Drawn back-to-front; built left-to-right. */}
        {houses.map((h, i) => (
          <motion.path
            key={h.d}
            d={h.d}
            fill={h.fill}
            fillOpacity={h.opacity}
            fillRule="evenodd"
            initial={animate ? { y: 40, opacity: 0, scaleY: 0.4 } : false}
            animate={{ y: 0, opacity: 1, scaleY: 1 }}
            style={{ transformOrigin: 'bottom', transformBox: 'fill-box' }}
            transition={{ delay: 0.15 + (houses.length - 1 - i) * 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>
      <span className="flex flex-col leading-none text-bark">
        <span className="font-display text-[19px] tracking-[0.28em]">CONCEPT</span>
        <span className="mt-1 text-[9.5px] font-normal tracking-[0.34em]">HOME INTERIOR</span>
      </span>
    </span>
  )
}
