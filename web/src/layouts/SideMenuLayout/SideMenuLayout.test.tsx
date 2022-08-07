import { render, screen } from '@redwoodjs/testing/web'

import SideMenuLayout from './SideMenuLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SideMenuLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SideMenuLayout />)
    }).not.toThrow()
  })

  it('renders the splash image', () => {
    render(<SideMenuLayout />)
    expect(screen.getByAltText('Cloud Cooking Splash')).toBeInTheDocument()
  })
})
