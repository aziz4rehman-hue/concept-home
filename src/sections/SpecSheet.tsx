import { specs } from '../content'
import Reveal, { SectionTitle } from '../components/Reveal'

export default function SpecSheet() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[28px] border border-walnut/15 bg-linen">
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'linear-gradient(rgba(176,138,91,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(176,138,91,.1) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative grid gap-10 p-7 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionTitle label="Spec sheet · Sheet 01 / 01" lines={['What goes', 'inside']} />
              <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-bark">
                The parts you can't see decide how long a sofa lasts. This is what we build with.
              </p>
            </div>
            <dl className="divide-y divide-walnut/15 border-y border-walnut/15">
              {specs.map((s) => (
                <div key={s.label} className="grid gap-1 py-5 sm:grid-cols-[140px_1fr] sm:gap-6">
                  <dt className="label pt-1">{s.label}</dt>
                  <dd className="text-[17px] leading-snug">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative flex justify-between border-t border-walnut/15 px-7 py-3 font-mono text-[10px] tracking-[0.18em] text-bark uppercase sm:px-12">
            <span>Concept Home Interior</span>
            <span>Scale: to your room</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
