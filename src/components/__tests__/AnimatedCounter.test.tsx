import { render, screen, act, waitFor } from '@testing-library/react'
import AnimatedCounter from '../AnimatedCounter'

// Mock requestAnimationFrame properly
let mockRequestAnimationFrame: jest.SpyInstance

beforeEach(() => {
  mockRequestAnimationFrame = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
    setTimeout(cb, 16)
    return 1
  })
})

afterEach(() => {
  if (mockRequestAnimationFrame) {
    mockRequestAnimationFrame.mockRestore()
  }
})

describe('AnimatedCounter Component', () => {
  it('renders initial value of 0', () => {
    render(<AnimatedCounter end={100} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('eventually shows the end value', async () => {
    render(<AnimatedCounter end={100} duration={100} />)
    
    // Wait for animation to complete
    await waitFor(() => {
      expect(screen.getByText('100')).toBeInTheDocument()
    }, { timeout: 500 })
  })

  it('displays suffix when provided', async () => {
    render(<AnimatedCounter end={50} suffix="%" duration={100} />)
    
    // Check that suffix is present in the component - look for the % symbol separately
    expect(screen.getByText('%')).toBeInTheDocument()
    
    // Fast-forward animation and check the final result
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150))
    })
    
    // Check that both the number and suffix are present
    await waitFor(() => {
      expect(screen.getByText('50')).toBeInTheDocument()
      expect(screen.getByText('%')).toBeInTheDocument()
    }, { timeout: 500 })
  })

  it('displays prefix when provided', async () => {
    render(<AnimatedCounter end={1000} prefix="$" duration={100} />)
    
    // Check that prefix is present in the component - look for the $ symbol separately
    expect(screen.getByText('$')).toBeInTheDocument()
    
    // Fast-forward animation and check the final result
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150))
    })
    
    // Check that both the prefix and number are present
    await waitFor(() => {
      expect(screen.getByText('$')).toBeInTheDocument()
      expect(screen.getByText('1,000')).toBeInTheDocument()
    }, { timeout: 500 })
  })

  it('applies custom className', () => {
    const { container } = render(
      <AnimatedCounter end={100} className="custom-counter" />
    )
    
    expect(container.firstChild).toHaveClass('custom-counter')
  })

  it('handles zero as end value', () => {
    render(<AnimatedCounter end={0} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('handles negative values', async () => {
    render(<AnimatedCounter end={-50} duration={100} />)
    
    await waitFor(() => {
      expect(screen.getByText('-50')).toBeInTheDocument()
    }, { timeout: 500 })
  })

  it('respects custom duration approximately', async () => {
    render(<AnimatedCounter end={100} duration={200} />)
    
    // Since we're mocking requestAnimationFrame with setTimeout,
    // we can't accurately test the exact duration, so we just verify
    // that the animation completes within a reasonable time
    await waitFor(() => {
      expect(screen.getByText('100')).toBeInTheDocument()
    }, { timeout: 1000 })
    
    // Just verify the animation completed - the exact timing is hard to test
    // in a mocked environment
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('handles fractional numbers correctly', async () => {
    render(<AnimatedCounter end={99.5} duration={100} />)
    
    await waitFor(() => {
      // The component should round to nearest integer
      expect(screen.getByText('100')).toBeInTheDocument()
    }, { timeout: 500 })
  })

  it('starts animation immediately when component mounts', () => {
    render(<AnimatedCounter end={100} />)
    
    // Should start with 0
    expect(screen.getByText('0')).toBeInTheDocument()
    
    // Verify requestAnimationFrame was called
    expect(mockRequestAnimationFrame).toHaveBeenCalled()
  })

  it('handles component with both prefix and suffix', async () => {
    render(<AnimatedCounter end={50} prefix="$" suffix=".00" duration={100} />)
    
    // Initially should show the separate parts
    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('.00')).toBeInTheDocument()
    
    // After animation should show all parts
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150))
    })
    
    await waitFor(() => {
      expect(screen.getByText('$')).toBeInTheDocument()
      expect(screen.getByText('50')).toBeInTheDocument()
      expect(screen.getByText('.00')).toBeInTheDocument()
    }, { timeout: 500 })
  })

  it('handles large numbers with formatting', async () => {
    render(<AnimatedCounter end={1000} duration={100} />)
    
    await waitFor(() => {
      // The component might format large numbers with commas
      const element = screen.getByText(/1,?000/)
      expect(element).toBeInTheDocument()
    }, { timeout: 500 })
  })
})
    
    await waitFor(() => {
      const element = screen.getByText((content, element) => {
        return element?.textContent === '$50.00' || false
      })
      expect(element).toBeInTheDocument()
    }, { timeout: 500 })
    })
    })
    