import { useEffect, useRef, useState, type FormEvent } from 'react'
import { business, contact } from '../content'
import { waLink } from '../lib/hooks'
import { useOrder } from '../lib/order'
import Magnetic from '../components/Magnetic'
import Reveal, { SectionTitle } from '../components/Reveal'

type Form = { name: string; role: string; piece: string; quantity: string; size: string; details: string }
const empty: Form = { name: '', role: contact.roles[0], piece: contact.pieces[1], quantity: '1', size: '', details: '' }

export default function Contact() {
  const [form, setForm] = useState<Form>(empty)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const { prefill } = useOrder()
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!prefill) return
    setForm((f) => ({ ...f, piece: prefill.piece ?? f.piece, details: prefill.details ?? f.details }))
    window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 700)
  }, [prefill])

  const set = (k: keyof Form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Please add your name.')
      nameRef.current?.focus()
      return
    }
    setError('')
    const msg = [
      'Hello Concept Home Interior,',
      '',
      `Name: ${form.name.trim()}`,
      `I am a: ${form.role}`,
      `Piece: ${form.piece}`,
      `Quantity: ${form.quantity || '1'}`,
      form.size.trim() ? `Size: ${form.size.trim()}` : null,
      form.details.trim() ? `Details: ${form.details.trim()}` : null,
    ]
      .filter((line) => line !== null)
      .join('\n')
    window.open(waLink(msg), '_blank', 'noopener')
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(business.phoneDisplay)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked – number is still visible */
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-linen py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionTitle label="Custom order" lines={contact.title} />
          <Reveal className="mt-6 max-w-md text-[17px] leading-relaxed text-bark">{contact.intro}</Reveal>

          <Reveal className="mt-10 space-y-6" delay={0.1}>
            <div>
              <p className="label mb-2">WhatsApp / call</p>
              <div className="flex items-center gap-3">
                <a href={`tel:${business.phoneTel}`} className="h-display text-[clamp(2rem,4vw,2.75rem)] hover:text-accent">
                  {business.phoneDisplay}
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="rounded-full border border-walnut/20 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors hover:border-accent hover:text-accent"
                  aria-live="polite"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <div>
              <p className="label mb-2">Email</p>
              <a href={`mailto:${business.email}`} className="break-all text-[17px] hover:text-accent">
                {business.email}
              </a>
            </div>
            <div>
              <p className="label mb-2">Area</p>
              <p className="text-[17px]">{business.area}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <form onSubmit={submit} className="grid gap-4 rounded-[28px] border border-walnut/10 bg-sand/60 p-6 sm:grid-cols-2 sm:p-9" noValidate>
            <Field label="Your name" className="sm:col-span-2">
              <input ref={nameRef} className="field" value={form.name} onChange={set('name')} autoComplete="name" placeholder="Full name" />
            </Field>
            <Field label="I am a">
              <select className="field" value={form.role} onChange={set('role')}>
                {contact.roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </Field>
            <Field label="Piece">
              <select className="field" value={form.piece} onChange={set('piece')}>
                {contact.pieces.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </Field>
            <Field label="Quantity">
              <input className="field" type="number" min={1} inputMode="numeric" value={form.quantity} onChange={set('quantity')} />
            </Field>
            <Field label="Size (if known)">
              <input className="field" value={form.size} onChange={set('size')} placeholder="e.g. 7 ft × 3 ft" />
            </Field>
            <Field label="Details" className="sm:col-span-2">
              <textarea
                className="field min-h-[120px] resize-y"
                value={form.details}
                onChange={set('details')}
                placeholder="Fabric, colour, wood, room, delivery area…"
              />
            </Field>
            {error && (
              <p role="alert" className="text-[14px] text-[#9a3b1e] sm:col-span-2">
                {error}
              </p>
            )}
            <div className="flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[13px] text-bark">Opens WhatsApp with your message ready to send.</p>
              <Magnetic>
                <button type="submit" className="btn btn-primary w-full sm:w-auto">
                  Send on WhatsApp <span aria-hidden>→</span>
                </button>
              </Magnetic>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ label, className = '', children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="label">{label}</span>
      {children}
    </label>
  )
}
