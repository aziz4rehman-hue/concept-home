import type { CollectionId } from '../content'

// Gold technical line drawings of each furniture type, with measurement lines.
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
const M = { fill: 'none', stroke: 'currentColor', strokeWidth: 0.8, opacity: 0.7 }

function Dim({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g>
      <line x1={x1} x2={x2} y1={y} y2={y} {...M} />
      <line x1={x1} x2={x1} y1={y - 5} y2={y + 5} {...M} />
      <line x1={x2} x2={x2} y1={y - 5} y2={y + 5} {...M} />
      <text x={(x1 + x2) / 2} y={y - 7} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="currentColor" letterSpacing="1">
        {label}
      </text>
    </g>
  )
}

function VDim({ x, y1, y2, label }: { x: number; y1: number; y2: number; label: string }) {
  return (
    <g>
      <line x1={x} x2={x} y1={y1} y2={y2} {...M} />
      <line x1={x - 5} x2={x + 5} y1={y1} y2={y1} {...M} />
      <line x1={x - 5} x2={x + 5} y1={y2} y2={y2} {...M} />
      <text
        x={x - 8}
        y={(y1 + y2) / 2}
        textAnchor="middle"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="9"
        fill="currentColor"
        letterSpacing="1"
        transform={`rotate(-90 ${x - 8} ${(y1 + y2) / 2})`}
      >
        {label}
      </text>
    </g>
  )
}

const shapes: Record<CollectionId, JSX.Element> = {
  beds: (
    <g {...S}>
      <path d="M60 170V90q0-30 30-30h140q30 0 30 30v80" />
      <path d="M80 98q0-18 18-18h124q18 0 18 18" />
      <rect x="50" y="150" width="240" height="40" rx="6" />
      <rect x="56" y="138" width="228" height="16" rx="6" />
      <rect x="84" y="118" width="64" height="22" rx="9" />
      <rect x="172" y="118" width="64" height="22" rx="9" />
      <path d="M60 190v16M280 190v16" />
    </g>
  ),
  sofas: (
    <g {...S}>
      <path d="M60 110q0-16 16-16h188q16 0 16 16v40" />
      <rect x="40" y="120" width="34" height="70" rx="12" />
      <rect x="266" y="120" width="34" height="70" rx="12" />
      <rect x="74" y="148" width="64" height="26" rx="6" />
      <rect x="138" y="148" width="64" height="26" rx="6" />
      <rect x="202" y="148" width="64" height="26" rx="6" />
      <path d="M74 174v16h192v-16" />
      <path d="M56 190l-4 16M284 190l4 16" />
    </g>
  ),
  dining: (
    <g {...S}>
      <rect x="70" y="120" width="200" height="10" rx="2" />
      <path d="M86 130l-6 76M254 130l6 76M110 130v6M230 130v6" />
      <path d="M30 80v126M30 150h36v56M30 150q4-10 14-10h22" />
      <path d="M310 80v126M310 150h-36v56M310 150q-4-10-14-10h-22" />
      <path d="M30 80q0-6 6-6h4M310 80q0-6-6-6h-4" />
    </g>
  ),
  wardrobes: (
    <g {...S}>
      <rect x="80" y="40" width="180" height="160" rx="3" />
      <path d="M140 40v160M200 40v160M80 184h180" />
      <path d="M134 110v14M146 110v14M194 110v14M206 110v14" />
      <path d="M90 200v8M250 200v8" />
    </g>
  ),
  office: (
    <g {...S}>
      <rect x="40" y="110" width="200" height="12" rx="2" />
      <rect x="48" y="122" width="56" height="84" />
      <path d="M48 150h56M48 178h56M70 136h12M70 164h12M70 192h12" />
      <path d="M232 122v84" />
      <path d="M262 88q0-20 18-20h12q18 0 18 20v58h-48z" />
      <path d="M256 146h60v12h-60zM286 158v32M266 206l20-16 20 16" />
    </g>
  ),
  chairs: (
    <g {...S}>
      <path d="M90 100q0-34 80-34t80 34" />
      <rect x="70" y="100" width="40" height="80" rx="16" />
      <rect x="230" y="100" width="40" height="80" rx="16" />
      <path d="M110 100h120v40H110z" />
      <rect x="104" y="140" width="132" height="28" rx="8" />
      <path d="M100 180h140M100 180v24M240 180v24" />
      <circle cx="130" cy="84" r="1.6" />
      <circle cx="170" cy="78" r="1.6" />
      <circle cx="210" cy="84" r="1.6" />
    </g>
  ),
}

export default function Drawing({ id, size }: { id: CollectionId; size: string }) {
  const [w, h] = size.split(' × ')
  return (
    <svg viewBox="0 0 340 240" className="h-full w-full text-gold" aria-hidden="true">
      <defs>
        <pattern id={`grid-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0v20" fill="none" stroke="currentColor" strokeWidth=".4" opacity=".25" />
        </pattern>
      </defs>
      <rect width="340" height="240" fill={`url(#grid-${id})`} />
      {shapes[id]}
      <Dim x1={40} x2={300} y={226} label={`${w} cm`} />
      <VDim x={20} y1={40} y2={206} label={h ?? ''} />
    </svg>
  )
}
