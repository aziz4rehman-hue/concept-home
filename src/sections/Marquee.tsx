import { marquee } from '../content'

export default function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="marquee overflow-hidden border-y border-walnut/10 bg-linen py-5" aria-label="What we make">
      <div className="marquee-track flex w-max">
        {items.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap" aria-hidden={i >= marquee.length}>
            <span className="font-display px-7 text-[clamp(1.4rem,3vw,2.2rem)] italic text-walnut/85">{item}</span>
            <svg viewBox="0 0 10 10" className="h-2 w-2 text-gold" aria-hidden>
              <path d="M5 0 10 5 5 10 0 5z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}
