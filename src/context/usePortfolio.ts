import { useContext } from 'react'
import { PortfolioContext } from './PortfolioStore'

export function usePortfolio() {
  return useContext(PortfolioContext)
}
