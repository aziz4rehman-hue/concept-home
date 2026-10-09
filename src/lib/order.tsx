import { createContext, useContext, useState, type ReactNode } from 'react'

// Lets the 3D configurator and collection cards pre-fill the contact form.
type Prefill = { piece?: string; details?: string; stamp: number }

const OrderContext = createContext<{
  prefill: Prefill | null
  setPrefill: (p: Omit<Prefill, 'stamp'>) => void
}>({ prefill: null, setPrefill: () => {} })

export function OrderProvider({ children }: { children: ReactNode }) {
  const [prefill, set] = useState<Prefill | null>(null)
  return (
    <OrderContext.Provider value={{ prefill, setPrefill: (p) => set({ ...p, stamp: Date.now() }) }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => useContext(OrderContext)
