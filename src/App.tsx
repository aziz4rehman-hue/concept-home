import { lazy, Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { OrderProvider } from './lib/order'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'

const Gallery = lazy(() => import('./pages/Gallery'))

function ScrollManager() {
  const { pathname, state } = useLocation()
  useEffect(() => {
    const target = (state as { scrollTo?: string } | null)?.scrollTo
    if (target) {
      requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }))
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, state])
  return null
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <OrderProvider>
        <HashRouter>
          <ScrollManager />
          <Header />
          <main>
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <WhatsAppButton />
        </HashRouter>
      </OrderProvider>
    </MotionConfig>
  )
}
