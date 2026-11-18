import { createContext } from 'react'
import type { PortfolioData } from '../types/portfolio'

export const PortfolioContext = createContext<{ data: PortfolioData; loading: boolean }>({
  data: null as unknown as PortfolioData,
  loading: true,
})
