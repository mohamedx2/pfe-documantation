import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { NavigationProvider } from '@/components/NavigationContext'
import { ThemeProvider } from 'next-themes'

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <NavigationProvider>
        {children}
      </NavigationProvider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock data for tests
export const mockSectionData = {
  hero: true,
  demos: false,
  'getting-started': false,
  features: false,
  community: false,
  cta: false,
}

// Helper functions for tests
export const waitForAnimation = (duration = 1000) => 
  new Promise(resolve => setTimeout(resolve, duration))

export const createMockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })
  return mockIntersectionObserver
}
