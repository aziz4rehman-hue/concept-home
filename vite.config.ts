import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Writes robots.txt and sitemap.xml for the site address set in .env (VITE_SITE_URL).
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n` })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // GitHub Pages serves the site from /<repo-name>/ until a custom domain is connected.
  // The deploy workflow sets BASE_PATH; with a custom domain it becomes "/" (see DOMAIN-SETUP.md).
  const base = process.env.BASE_PATH ?? '/'

  return {
    base,
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL ?? '')],
    build: {
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          // three.js is left out on purpose: Rollup keeps it in the lazy 3D chunk so phones load the page first.
          manualChunks: {
            motion: ['framer-motion'],
          },
        },
      },
    },
  }
})
