import { render, screen } from '@redwoodjs/testing/web'

import Splash from './Splash'

describe('Splash', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Splash />)
    }).not.toThrow()
  })

  it('renders the splash image', () => {
    render(<Splash />)
    const splashImg = screen.getByAltText<HTMLImageElement>(
      'Cloud Cooking Splash'
    )
    expect(splashImg).toBeInTheDocument()
    expect(splashImg.nodeName).toEqual('IMG')
  })
})
