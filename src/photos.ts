import images from './generated/images.json'

export type Category = 'Sofas' | 'Chairs' | 'Beds' | 'Dining' | 'Wardrobes' | 'Office' | 'Living rooms'

export type Photo = {
  name: keyof typeof images
  category: Category
  alt: string
}

export const photos: Photo[] = [
  { name: 'sofa-l-shape-ivory', category: 'Sofas', alt: 'Ivory bouclé L-shape sofa with chaise on light wooden legs' },
  { name: 'dining-oval-walnut', category: 'Dining', alt: 'Oval walnut dining table with six cream upholstered chairs' },
  { name: 'wardrobe-dressing-unit', category: 'Wardrobes', alt: 'Three-door grey wardrobe with lit dressing mirror and walnut shelves' },
  { name: 'chair-wingback-beige', category: 'Chairs', alt: 'Beige wingback armchair with cushion on dark wooden legs' },
  { name: 'chesterfield-sofa-green', category: 'Sofas', alt: 'Green leather Chesterfield three-seater sofa with four cushions' },
  { name: 'office-chesterfield-set', category: 'Office', alt: 'Office lounge with green leather Chesterfield sofa, armchairs and wooden desk' },
  { name: 'chesterfield-armchair-green', category: 'Chairs', alt: 'Green leather Chesterfield armchair with brass stud trim' },
  { name: 'sofa-beige-linen', category: 'Sofas', alt: 'Beige linen two-seater sofa with patterned cushions' },
  { name: 'bed-cream-carved', category: 'Beds', alt: 'Cream upholstered bed with curved headboard and carved legs' },
  { name: 'sofa-curved-fringe', category: 'Sofas', alt: 'Curved ivory velvet sofa with fringe trim' },
  { name: 'sofa-brown-leather', category: 'Sofas', alt: 'Brown leather three-seater sofa on wooden legs' },
  { name: 'chair-lounge-taupe', category: 'Chairs', alt: 'Taupe fabric lounge chair on a wooden base' },
  { name: 'living-room-set', category: 'Living rooms', alt: 'Living room with grey modular sofa and two rust velvet lounge chairs' },
]

const base = import.meta.env.BASE_URL

export function imageProps(name: Photo['name'], sizes: string) {
  const info = images[name]
  const widths = info.widths
  return {
    src: `${base}img/${name}-${widths[Math.min(1, widths.length - 1)]}.webp`,
    srcSet: widths.map((w) => `${base}img/${name}-${w}.webp ${w}w`).join(', '),
    sizes,
    width: info.width,
    height: info.height,
  }
}
