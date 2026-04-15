import { act, render, screen } from '@testing-library/react'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import App from './App'

vi.mock('framer-motion', () => ({
  motion: {
    h1: (props: any) => <h1 className={props.className}>{props.children}</h1>,
  },
}))

vi.mock('./components/CallToAction', () => ({
  default: () => <div data-testid='call-to-action'>CallToAction</div>,
}))

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the "You Are!" heading', () => {
    render(<App />)
    expect(screen.getByText('You Are!')).toBeInTheDocument()
  })

  it('does not show CallToAction initially', () => {
    render(<App />)
    expect(screen.queryByTestId('call-to-action')).not.toBeInTheDocument()
  })

  it('shows CallToAction after the 3.5s delay', async () => {
    render(<App />)
    await act(async () => {
      vi.advanceTimersByTime(3500)
    })
    expect(screen.getByTestId('call-to-action')).toBeInTheDocument()
  })

  it('cleans up the timer on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout')
    const { unmount } = render(<App />)
    unmount()
    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})
