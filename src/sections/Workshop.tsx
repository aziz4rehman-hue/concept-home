import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { workshop } from '../content'
import Reveal, { SectionTitle } from '../components/Reveal'
import Picture from '../components/Picture'

export default function Workshop() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="workshop" className="scroll-mt-20 bg-linen py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle label="How it's made" lines={workshop.title} />
          <Reveal className="mt-6 max-w-md text-[17px] leading-relaxed text-bark">{workshop.intro}</Reveal>
          <Reveal className="mt-10 hidden overflow-hidden rounded-[24px] lg:block" delay={0.1}>
            <Picture
              name="chesterfield-armchair-green"
              sizes="40vw"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
        </div>

        <ol ref={ref} className="relative">
          <div aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-walnut/15" />
          <motion.div
            aria-hidden
            className="absolute bottom-6 left-[19px] top-6 w-px origin-top bg-accent"
            style={{ scaleY: fill }}
          />
          {workshop.steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.05} className="relative pb-14 pl-16 last:pb-0">
              <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-sand font-mono text-[12px] text-accent">
                {s.n}
              </span>
              <h3 className="h-display text-[clamp(1.9rem,3.6vw,2.75rem)]">{s.title}</h3>
              <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-bark">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
