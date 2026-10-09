import { audiences } from '../content'
import Reveal, { SectionTitle } from '../components/Reveal'
import TiltCard from '../components/TiltCard'

const icons = [
  // home
  <path key="h" d="M4 14 16 4l12 10v14H4zM13 28v-8h6v8" />,
  // designer: set square + pencil
  <path key="d" d="M5 27V5l22 22zM10 22v-5l5 5zM22 4l6 6-9 9-6 1 1-6z" />,
  // business: building
  <path key="b" d="M6 28V6h14v22M20 12h6v16M10 10h2M14 10h2M10 15h2M14 15h2M10 20h2M14 20h2M4 28h24" />,
  // showroom: storefront
  <path key="s" d="M4 12 6 5h20l2 7M4 12h24M4 12q0 4 4 4t4-4q0 4 4 4t4-4q0 4 4 4t4-4M6 16v12h20V16M13 28v-7h6v7" />,
]

export default function Audience() {
  return (
    <section id="trade" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionTitle label="Trade & retail" lines={audiences.title} />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.cards.map((card, i) => (
            <Reveal as="li" key={card.title} delay={i * 0.07}>
              <TiltCard className="h-full rounded-[24px]">
                <div className="flex h-full flex-col rounded-[24px] border border-walnut/10 bg-linen p-7">
                  <svg viewBox="0 0 32 32" className="h-9 w-9 text-warm" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden>
                    {icons[i]}
                  </svg>
                  <h3 className="h-display mt-8 text-[28px]">{card.title}</h3>
                  <ul className="mt-5 space-y-3 border-t border-walnut/10 pt-5">
                    {card.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] leading-snug text-bark">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
