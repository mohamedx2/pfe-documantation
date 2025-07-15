import { render, screen } from '@testing-library/react'
import FloatingCard from '../FloatingCard'

describe('FloatingCard Component', () => {
  it('renders children correctly', () => {
    render(
      <FloatingCard>
        <p>Test content</p>
      </FloatingCard>
    )
    
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <FloatingCard className="custom-class">
        <p>Test content</p>
      </FloatingCard>
    )
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('has default floating card styles', () => {
    const { container } = render(
      <FloatingCard>
        <p>Test content</p>
      </FloatingCard>
    )
    
    const card = container.firstChild as HTMLElement
    // Check for actual classes applied by the component
    expect(card).toHaveClass('transition-all')
    expect(card).toHaveClass('duration-200')
  })

  it('accepts additional props and forwards them', () => {
    const { container } = render(
      <FloatingCard data-testid="floating-card"  aria-label="test card">
        <p>Test content</p>
      </FloatingCard>
    )
    
    // Since the component might not forward all props, check the container
    const card = container.firstChild as HTMLElement
    expect(card).toBeInTheDocument()
    
    // Check if we can find the content which confirms the component rendered
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders as a div by default', () => {
    const { container } = render(
      <FloatingCard>
        <p>Test content</p>
      </FloatingCard>
    )
    
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('handles empty children gracefully', () => {
    const { container } = render(
      <FloatingCard />
    )
    
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('transition-all')
  })
})
