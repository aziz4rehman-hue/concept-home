import { useState } from 'react'
import { collections, contact } from '../content'
import { useGoTo } from '../lib/hooks'
import { useOrder } from '../lib/order'
import Drawing from '../components/Drawings'
import Picture from '../components/Picture'
import Reveal, { SectionTitle } from '../components/Reveal'
import TiltCard from '../components/TiltCard'

const pieceFor: Record<string, string> = {
  beds: 'Bed',
  sofas: 'Sofa',
  dining: 'Dining set',
  wardrobes: 'Wardrobe',
  office: 'Office furniture',
  chairs: 'Chair',
}

export default function Collections() {
  const [active, setActive] = useState<string | null>(null)
  const goTo = useGoTo()
  const { setPrefill } = useOrder()

  return (
    <section id="collections" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle label="Collections" lines={['Six things we', 'make best']} />
          <Reveal className="max-w-sm text-[16px] leading-relaxed text-bark">
            Every drawing is a starting point. Tell us your size, fabric and wood – we build it.{' '}
            <span className="hidden md:inline">Hover a drawing to see the finished piece.</span>
            <span className="md:hidden">Tap a drawing to see the finished piece.</span>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c, i) => {
            const open = active === c.id
            return (
              <Reveal as="li" key={c.id} delay={(i % 3) * 0.08}>
                <TiltCard className="h-full rounded-[24px]">
                  <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-walnut/10 bg-linen">
                    <button
                      type="button"
                      className="group/card relative block aspect-[4/3] w-full overflow-hidden text-left"
                      onClick={() => setActive(open ? null : c.id)}
                      aria-label={c.photo ? `Show photo of our ${c.title.toLowerCase()}` : `${c.title} drawing`}
                    >
                      {c.photo ? (
                        <Picture
                          name={c.photo as never}
                          sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw"
                          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out ${
                            open ? 'scale-100' : 'scale-105 group-hover/card:scale-100'
                          }`}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-end justify-center bg-oat/50 pb-5">
                          <span className="label">Photos coming soon</span>
                        </div>
                      )}
                      {/* Drawing layer wipes away on hover / tap */}
                      <div
                        className={`absolute inset-0 bg-linen p-6 transition-[clip-path] duration-700 ease-[cubic-bezier(.76,0,.24,1)] ${
                          c.photo
                            ? open
                              ? '[clip-path:inset(0_0_0_100%)]'
                              : '[clip-path:inset(0_0_0_0)] group-hover/card:[clip-path:inset(0_0_0_100%)]'
                            : ''
                        }`}
                      >
                        <Drawing id={c.id} size={c.size} />
                      </div>
                      <span className="label absolute left-4 top-4 rounded-full bg-linen/90 px-3 py-1.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </button>
                    <div className="flex flex-1 items-end justify-between gap-4 p-6">
                      <div>
                        <h3 className="h-display text-[30px]">{c.title}</h3>
                        <p className="mt-1.5 text-[15px] text-bark">{c.note}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPrefill({ piece: pieceFor[c.id] ?? contact.pieces[0] })
                          goTo('contact')
                        }}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-walnut/20 transition-colors hover:border-accent hover:bg-accent hover:text-linen"
                        aria-label={`Ask for a quote on ${c.title.toLowerCase()}`}
                      >
                        →
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
