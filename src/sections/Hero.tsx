import { motion } from 'framer-motion'
import { lazy, Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { configurator, hero } from '../content'
import { useGoTo, useMedia } from '../lib/hooks'
import { useOrder } from '../lib/order'
import Magnetic from '../components/Magnetic'
import Picture from '../components/Picture'

const ChairScene = lazy(() => import('../components/ChairScene'))

function canUseWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  const [up, setUp] = useState(configurator.upholstery[0])
  const [wood, setWood] = useState(configurator.wood[0])
  const [show3d, setShow3d] = useState(false)
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const goTo = useGoTo()
  const navigate = useNavigate()
  const { setPrefill } = useOrder()

  // Load the 3D scene after the page has painted so text appears instantly.
  useEffect(() => {
    if (!canUseWebGL()) return
    const lowPower = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    if (lowPower !== undefined && lowPower < 2) return
    const id = window.setTimeout(() => setShow3d(true), 350)
    return () => window.clearTimeout(id)
  }, [])

  const order = () => {
    setPrefill({ piece: 'Chair', details: `Lounge chair in ${up.name.toLowerCase()} with ${wood.name.toLowerCase()} wood. My size: ` })
    goTo('contact')
  }

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-20 lg:pt-36">
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[620px] w-[620px] rounded-full bg-linen/70 blur-3xl"
      />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div>
          <motion.p
            className="label mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {hero.eyebrow}
          </motion.p>
          <h1 className="h-display text-[clamp(2.75rem,6.6vw,5.9rem)] !leading-[1.04]">
            {hero.lines.map((line, i) => (
              <span key={line} className="-mb-[0.12em] block overflow-hidden pb-[0.2em]">
                <motion.span
                  className={`block ${i === 1 ? 'italic text-warm' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.35 + i * 0.14, duration: 1.1, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="mt-7 max-w-xl text-[17px] leading-relaxed text-bark sm:text-[18px]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease }}
          >
            {hero.story}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9, ease }}
          >
            <Magnetic>
              <button onClick={() => goTo('contact')} className="btn btn-primary">
                {hero.primary}
                <span aria-hidden>→</span>
              </button>
            </Magnetic>
            <Magnetic>
              <button onClick={() => navigate('/gallery')} className="btn btn-ghost">
                {hero.secondary}
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* 3D configurator */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease }}
        >
          <div className="relative aspect-[1/0.92] w-full overflow-hidden rounded-[28px] border border-walnut/10 bg-linen">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(176,138,91,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(176,138,91,.12) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            {show3d ? (
              <Suspense fallback={<Spinner />}>
                <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
                  <ChairScene up={up} wood={wood} reduced={reduced} />
                </div>
              </Suspense>
            ) : (
              <Picture
                name="chair-lounge-taupe"
                sizes="(min-width:1024px) 45vw, 90vw"
                className="absolute inset-0 h-full w-full object-contain p-10 mix-blend-multiply"
                eager
              />
            )}
            <span className="label absolute left-5 top-5">Configure · drag to rotate</span>
            <span className="label absolute right-5 top-5 hidden sm:block">Fig. 01</span>
          </div>

          <div className="mt-4 grid gap-4 rounded-[22px] border border-walnut/10 bg-linen/80 p-5 backdrop-blur sm:grid-cols-2">
            <Swatches label="Upholstery" items={configurator.upholstery} value={up.id} onChange={(id) => setUp(configurator.upholstery.find((u) => u.id === id)!)} />
            <Swatches label="Wood" items={configurator.wood} value={wood.id} onChange={(id) => setWood(configurator.wood.find((w) => w.id === id)!)} />
            <div className="flex flex-col gap-3 border-t border-walnut/10 pt-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[15px]">
                <span className="label mr-2">Your piece:</span>
                <span className="font-display italic">
                  {up.name} · {wood.name}
                </span>
              </p>
              <button onClick={order} className="btn btn-primary !py-2.5 !text-[14px]">
                Order this in your size
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Swatches({
  label,
  items,
  value,
  onChange,
}: {
  label: string
  items: { id: string; name: string; color: string }[]
  value: string
  onChange: (id: string) => void
}) {
  return (
    <fieldset>
      <legend className="label mb-2.5">{label}</legend>
      <div className="flex gap-2.5">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            title={it.name}
            aria-label={it.name}
            aria-pressed={value === it.id}
            onClick={() => onChange(it.id)}
            className={`h-9 w-9 rounded-full border-2 transition-all duration-300 ${
              value === it.id ? 'scale-110 border-accent ring-2 ring-linen ring-offset-0' : 'border-white/60 hover:scale-105'
            }`}
            style={{ background: it.color }}
          />
        ))}
      </div>
    </fieldset>
  )
}

function Spinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
    </div>
  )
}
