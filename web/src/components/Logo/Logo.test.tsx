import { render, screen } from '@redwoodjs/testing/web'

import Logo from './Logo'

describe('Logo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Logo />)
    }).not.toThrow()
  })

  it('has the "Cloud Cooking" name', () => {
    render(<Logo />)
    expect(screen.getByText('Cloud')).toBeInTheDocument()
    expect(screen.getByText('Cooking.')).toBeInTheDocument()
  })
})
