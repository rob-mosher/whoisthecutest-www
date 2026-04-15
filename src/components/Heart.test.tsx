import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Heart from './Heart'

describe('Heart', () => {
  it('renders an SVG element', () => {
    const { container } = render(<Heart />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders inside a span', () => {
    const { container } = render(<Heart />)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('SVG uses currentColor fill', () => {
    const { container } = render(<Heart />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('fill')).toBe('currentColor')
  })
})
