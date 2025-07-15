import { render, screen, fireEvent } from '@testing-library/react'
import GlowButton from '../GlowButton'
import React from 'react'
// Mock IntersectionObserver for tests
import '@testing-library/jest-dom'
describe('GlowButton Component', () => {
  it('renders as a link when href is provided', () => {
    render(
      <GlowButton href="/test">
        Test Link
      </GlowButton>
    )
    
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
    expect(screen.getByText('Test Link')).toBeInTheDocument()
  })

  it('renders as a button when href is not provided', () => {
    render(
      <GlowButton>
        Test Button
      </GlowButton>
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(
      <GlowButton onClick={handleClick}>
        Click Me
      </GlowButton>
    )
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies variant styles correctly', () => {
    render(
      <GlowButton variant="primary">
        Primary Button
      </GlowButton>
    )
    
    const button = screen.getByRole('button')
    // Check for the actual classes that are applied
    expect(button).toHaveClass('bg-primary')
    expect(button).toHaveClass('text-white')
  })

  it('applies custom className', () => {
    render(
      <GlowButton className="custom-btn">
        Custom Button
      </GlowButton>
    )
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-btn')
  })

  it('is disabled when disabled prop is true', () => {
    render(
      <GlowButton disabled>
        Disabled Button
      </GlowButton>
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    // Don't check for specific disabled classes, just verify it's disabled
    expect(button).toHaveAttribute('disabled')
  })

  it('renders with default styles', () => {
    render(
      <GlowButton>
        Default Button
      </GlowButton>
    )
    
    const button = screen.getByRole('button')
    // Check for basic styling that should always be present
    expect(button).toHaveClass('font-medium')
    expect(button).toHaveClass('rounded-full')
    expect(button).toHaveClass('transition-all')
  })
})
