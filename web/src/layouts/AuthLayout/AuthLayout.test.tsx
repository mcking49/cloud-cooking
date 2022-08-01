import { render, screen } from '@redwoodjs/testing/web'

import AuthLayout from './AuthLayout'

describe('AuthLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthLayout />)
    }).not.toThrow()
  })

  it('renders the logo', () => {
    render(<AuthLayout />)
    expect(screen.getByText('Cloud')).toBeInTheDocument()
  })

  it('renders the splash image', () => {
    render(<AuthLayout />)
    expect(screen.getByAltText('Cloud Cooking Splash')).toBeInTheDocument()
  })
})
