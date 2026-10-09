// All website text lives here so it can be edited (or translated to Urdu) in one place.

export const business = {
  name: 'Concept Home Interior',
  whatsapp: '923125445484',
  phoneDisplay: '0312-5445484',
  phoneTel: '+923125445484',
  email: 'concepthomesinterior@gmail.com',
  instagram: 'https://www.instagram.com/concept_homes.in/',
  facebook: 'https://www.facebook.com/profile.php?id=61577896075546',
  area: 'Islamabad & Rawalpindi',
}

export const nav = [
  { id: 'collections', label: 'Collections' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'trade', label: 'Trade' },
  { id: 'gallery', label: 'Gallery', page: '/gallery' },
  { id: 'contact', label: 'Contact' },
] as const

export const hero = {
  eyebrow: 'Furniture manufacturer · Islamabad',
  lines: ['Made in our workshop.', 'Built to your size.'],
  story:
    'For years our family workshop built the furniture you saw in showrooms. Now you can order straight from us – the same craftsmen, the same materials, at factory price.',
  primary: 'Get a quote',
  secondary: 'See our work',
}

export const configurator = {
  upholstery: [
    { id: 'cognac', name: 'Cognac leather', color: '#8B4A24', roughness: 0.42, sheen: 0 },
    { id: 'emerald', name: 'Emerald velvet', color: '#1F4A3A', roughness: 0.85, sheen: 1 },
    { id: 'boucle', name: 'Ivory bouclé', color: '#E9E1D2', roughness: 1, sheen: 0.4 },
    { id: 'charcoal', name: 'Charcoal linen', color: '#3B3A38', roughness: 0.95, sheen: 0.2 },
  ],
  wood: [
    { id: 'walnut', name: 'Walnut', color: '#5A3B24', grain: '#3A2414' },
    { id: 'sheesham', name: 'Sheesham', color: '#7A4A2A', grain: '#4E2C16' },
    { id: 'ash', name: 'Ash', color: '#CDB592', grain: '#A88E6A' },
  ],
}

export const marquee = [
  'Beds',
  'Three-seater sofas',
  'L-shape sofas',
  'Curved sofas',
  'Dining sets',
  'Wardrobes',
  'Office furniture',
  'Chesterfield',
  'Lounge chairs',
  'Made to measure',
]

export type CollectionId = 'beds' | 'sofas' | 'dining' | 'wardrobes' | 'office' | 'chairs'

export const collections: {
  id: CollectionId
  title: string
  note: string
  size: string
  photo?: string
}[] = [
  { id: 'beds', title: 'Beds', note: 'Upholstered and carved-wood frames', size: '183 × 198 cm', photo: 'bed-cream-carved' },
  { id: 'sofas', title: 'Sofas', note: 'Three-seater, L-shape and curved', size: '228 × 92 cm', photo: 'sofa-l-shape-ivory' },
  { id: 'dining', title: 'Dining', note: 'Tables and chairs for 4 to 12', size: '200 × 100 cm', photo: 'dining-oval-walnut' },
  { id: 'wardrobes', title: 'Wardrobes', note: 'Built to your wall, floor to ceiling', size: '240 × 60 cm', photo: 'wardrobe-dressing-unit' },
  { id: 'office', title: 'Office', note: 'Executive desks and lounge sets', size: '180 × 90 cm', photo: 'office-chesterfield-set' },
  { id: 'chairs', title: 'Chairs', note: 'Chesterfield and lounge chairs', size: '105 × 90 cm', photo: 'chair-wingback-beige' },
]

export const workshop = {
  title: ['From our', 'workshop'],
  intro: 'Every piece goes through the same four steps, in our own workshop, by the same team.',
  steps: [
    {
      n: '01',
      title: 'Measure & draw',
      text: 'We visit, measure your room and draw the piece to your size. You approve the drawing, fabric and wood before we cut anything.',
    },
    {
      n: '02',
      title: 'Frame',
      text: 'Solid seasoned hardwood frames, joined and glued, then braced at the corners so they stay square for years.',
    },
    {
      n: '03',
      title: 'Finish',
      text: 'High-density foam, hand-stretched fabric or leather, and wood polished in the shade you chose.',
    },
    {
      n: '04',
      title: 'Deliver & fit',
      text: 'Our own team delivers across Islamabad and Rawalpindi and sets every piece in place.',
    },
  ],
}

export const audiences = {
  title: ['Who we', 'make for'],
  cards: [
    {
      title: 'Homeowners',
      points: ['Any size to fit your room', 'Choose fabric, leather and wood', 'Factory price, no showroom markup'],
    },
    {
      title: 'Interior designers',
      points: ['Trade rates for your projects', 'We build from your drawings', 'Samples and finishes on request'],
    },
    {
      title: 'Businesses',
      points: ['Offices, hotels, restaurants, schools', 'Bulk orders with one finish', 'Delivery and fitting on site'],
    },
    {
      title: 'Showrooms',
      points: ['Wholesale pricing', 'Your designs, our workshop', 'Repeat orders made the same every time'],
    },
  ],
}

export const specs = [
  { label: 'Frame', value: 'Seasoned solid hardwood, corner-braced and glued' },
  { label: 'Woods', value: 'Sheesham, walnut, ash, deodar' },
  { label: 'Foam', value: 'High-density foam, 32–40 kg/m³, with fibre wrap' },
  { label: 'Finish', value: 'Matt or gloss polish, lacquer, or painted' },
  { label: 'Fabrics', value: 'Leather, velvet, bouclé, linen and more – bring your own if you like' },
  { label: 'Sizes', value: 'Made to your measurements – no standard sizes' },
]

export const contact = {
  title: ['Tell us what', 'you need'],
  intro: 'Send us the piece and size. We reply on WhatsApp with a drawing and price, usually the same day.',
  roles: ['Homeowner', 'Interior designer', 'Business', 'Showroom'],
  pieces: ['Bed', 'Sofa', 'Dining set', 'Wardrobe', 'Office furniture', 'Chair', 'Other'],
}
