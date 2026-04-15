import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import CallToAction from './CallToAction'

vi.mock('framer-motion', () => ({
  motion: {
    button: ({ animate, initial, transition, whileHover, whileTap, children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
}))

vi.mock('./Heart', () => ({
  default: () => <span data-testid='heart' />,
}))

describe('CallToAction', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    })
  })

  it('renders the children text', () => {
    render(
      <CallToAction animationDuration={0.5} callToActionURL='https://example.com'>
        show me plz
      </CallToAction>
    )
    expect(screen.getByText('show me plz')).toBeInTheDocument()
  })

  it('renders a button element', () => {
    render(
      <CallToAction animationDuration={0.5} callToActionURL='https://example.com'>
        click me
      </CallToAction>
    )
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders two Heart icons', () => {
    render(
      <CallToAction animationDuration={0.5} callToActionURL='https://example.com'>
        click me
      </CallToAction>
    )
    expect(screen.getAllByTestId('heart')).toHaveLength(2)
  })

  it('sets window.location.href to the callToActionURL on click', async () => {
    const url = 'https://www.youtube.com/watch?v=test123'
    render(
      <CallToAction animationDuration={0.5} callToActionURL={url}>
        go
      </CallToAction>
    )
    await userEvent.click(screen.getByRole('button'))
    expect(window.location.href).toBe(url)
  })
})
