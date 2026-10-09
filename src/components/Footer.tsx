import { business } from '../content'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-oat/60 pb-28 pt-16 sm:pb-16">
      <div className="container-x grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo animate={false} />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-bark">
            Family furniture workshop in Islamabad. Custom pieces, factory direct, delivered across {business.area}.
          </p>
        </div>
        <div>
          <p className="label mb-4">Contact</p>
          <ul className="space-y-2 text-[15px]">
            <li>
              <a href={`tel:${business.phoneTel}`} className="hover:text-accent">
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="break-all hover:text-accent">
                {business.email}
              </a>
            </li>
            <li className="text-bark">Islamabad, Pakistan</li>
          </ul>
        </div>
        <div>
          <p className="label mb-4">Follow</p>
          <ul className="space-y-2 text-[15px]">
            <li>
              <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                Instagram
              </a>
            </li>
            <li>
              <a href={business.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-12 flex flex-col gap-2 border-t border-walnut/10 pt-6 text-[13px] text-bark sm:flex-row sm:justify-between sm:pr-28">
        <span>© {new Date().getFullYear()} {business.name}</span>
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase">Made in Islamabad</span>
      </div>
    </footer>
  )
}
