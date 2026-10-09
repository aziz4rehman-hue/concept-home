// Converts ./photos/*.jpeg into responsive WebP files in public/img
// and writes src/generated/images.json with sizes for <img srcset>.
// Also builds the Open Graph preview image and favicons from the logo.
import sharp from 'sharp'
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const srcDir = path.join(root, 'photos')
const outDir = path.join(root, 'public', 'img')
const genDir = path.join(root, 'src', 'generated')
const WIDTHS = [480, 960, 1600]

await mkdir(outDir, { recursive: true })
await mkdir(genDir, { recursive: true })

const files = (await readdir(srcDir)).filter(
  (f) => /\.(jpe?g|png|webp)$/i.test(f) && !/^logo\./i.test(f),
)

const manifest = {}
for (const file of files) {
  const name = path.parse(file).name
  const input = path.join(srcDir, file)
  const meta = await sharp(input).rotate().metadata()
  const widths = WIDTHS.filter((w) => w < meta.width).concat(meta.width > 1600 ? [] : [meta.width])
  const unique = [...new Set(widths)].sort((a, b) => a - b)
  const srcStat = await stat(input)
  for (const w of unique) {
    const out = path.join(outDir, `${name}-${w}.webp`)
    if (existsSync(out) && (await stat(out)).mtimeMs > srcStat.mtimeMs) continue
    await sharp(input).rotate().resize({ width: w }).webp({ quality: 78 }).toFile(out)
  }
  manifest[name] = { width: meta.width, height: meta.height, widths: unique }
}
await writeFile(path.join(genDir, 'images.json'), JSON.stringify(manifest, null, 2))

// Favicons + Open Graph image, drawn from the vector logo
const pub = path.join(root, 'public')
const favicon = path.join(pub, 'favicon.svg')
await sharp(favicon, { density: 300 }).resize(180, 180).png().toFile(path.join(pub, 'apple-touch-icon.png'))
await sharp(favicon, { density: 300 }).resize(48, 48).png().toFile(path.join(pub, 'favicon.png'))

const hero = path.join(srcDir, 'chesterfield-sofa-green.jpeg')
if (existsSync(hero)) {
  const photo = await sharp(hero).resize(660, 630, { fit: 'cover' }).toBuffer()
  const panel = Buffer.from(`<svg width="540" height="630" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(197 96) scale(1.3)">
      <path d="M56 26 84 0l28 26v84H56z" fill="#CDBFB1"/>
      <path d="M28 30 56 6l28 24v80H28z" fill="#B8957A" fill-opacity=".9"/>
      <path fill-rule="evenodd" d="M0 32 28 8l28 24v78H0zm16 30v48h22V62z" fill="#A39486" fill-opacity=".92"/>
    </g>
    <text x="270" y="300" text-anchor="middle" font-family="Georgia, serif" font-size="52" letter-spacing="10" fill="#6E5B4B">CONCEPT</text>
    <text x="270" y="342" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" letter-spacing="7" fill="#6E5B4B">HOME INTERIOR</text>
    <line x1="150" x2="390" y1="380" y2="380" stroke="#B8957A" stroke-width="2"/>
    <text x="270" y="445" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="32" fill="#2B1F17">Built to your size.</text>
    <text x="270" y="500" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" letter-spacing="4" fill="#6E5B4B">FACTORY DIRECT · ISLAMABAD</text>
  </svg>`)
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#EAE0D3' } })
    .composite([
      { input: panel, left: 0, top: 0 },
      { input: photo, left: 540, top: 0 },
    ])
    .jpeg({ quality: 82 })
    .toFile(path.join(pub, 'og-image.jpg'))
}

console.log(`Optimised ${files.length} photos → public/img`)
