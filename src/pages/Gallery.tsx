import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { photos, type Category } from '../photos'
import Picture from '../components/Picture'
import { SectionTitle } from '../components/Reveal'

const categories = ['All', ...Array.from(new Set(photos.map((p) => p.category)))] as const

export default function Gallery() {
  const [filter, setFilter] = useState<'All' | Category>('All')
  const [open, setOpen] = useState<number | null>(null)
  const list = useMemo(() => (filter === 'All' ? photos : photos.filter((p) => p.category === filter)), [filter])

  useEffect(() => {
    document.title = 'Gallery | Concept Home Interior – Custom Furniture Islamabad'
    return () => {
      document.title = 'Custom Furniture Islamabad | Concept Home Interior – Furniture Manufacturer'
    }
  }, [])

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + list.length) % list.length)),
    [list.length],
  )

  useEffect(() => {
    if (open === null) return
    const on = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', on)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', on)
      document.body.style.overflow = ''
    }
  }, [open, step])

  return (
    <section className="min-h-screen pb-24 pt-32 sm:pt-40">
      <div className="container-x">
        <SectionTitle label="Gallery" lines={['Pieces from', 'our workshop']} />

        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${
                filter === c ? 'border-accent bg-accent text-linen' : 'border-walnut/20 hover:border-walnut'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.ul layout className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                layout
                key={p.name}
                className="mb-5 break-inside-avoid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <button
                  onClick={() => setOpen(i)}
                  className="group block w-full overflow-hidden rounded-[20px] bg-linen"
                  aria-label={`Open photo: ${p.alt}`}
                >
                  <Picture
                    name={p.name}
                    sizes="(min-width:1024px) 31vw, (min-width:640px) 46vw, 92vw"
                    className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </button>
                <p className="label mt-2.5 px-1">{p.category}</p>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {open !== null && list[open] && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-walnut/92 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={list[open].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              key={list[open].name}
              className="relative max-h-full"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) step(1)
                else if (info.offset.x > 60) step(-1)
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Picture
                name={list[open].name}
                sizes="92vw"
                eager
                className="max-h-[82svh] w-auto rounded-xl object-contain select-none"
              />
              <p className="mt-3 text-center text-[14px] text-linen/80">{list[open].alt}</p>
            </motion.div>
            <button
              className="absolute right-4 top-4 h-11 w-11 rounded-full bg-linen/10 text-2xl text-linen hover:bg-linen/20"
              onClick={() => setOpen(null)}
              aria-label="Close"
            >
              ×
            </button>
            {list.length > 1 && (
              <>
                <LbArrow dir={-1} onClick={() => step(-1)} />
                <LbArrow dir={1} onClick={() => step(1)} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function LbArrow({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-full bg-linen/10 text-xl text-linen hover:bg-linen/20 sm:block ${
        dir < 0 ? 'left-4' : 'right-4'
      }`}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      aria-label={dir < 0 ? 'Previous photo' : 'Next photo'}
    >
      {dir < 0 ? '←' : '→'}
    </button>
  )
}
