import user from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import SideMenuNav from './SideMenuNav'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SideMenuNav', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SideMenuNav />)
    }).not.toThrow()
  })

  it('should have an explore link', () => {
    render(<SideMenuNav />)
    expect(screen.getByText('Explore')).toBeInTheDocument()
  })

  it('should have a favourites link', () => {
    render(<SideMenuNav />)
    expect(screen.getByText('Favourites')).toBeInTheDocument()
  })

  it('should have a "create recipe" link', () => {
    render(<SideMenuNav />)
    expect(screen.getByText('Create Recipe')).toBeInTheDocument()
  })

  it('should close when a link is clicked', async () => {
    const onClose = jest.fn()
    render(<SideMenuNav onClose={onClose} />)
    const explore = screen.getByText('Explore')

    await waitFor(() => user.click(explore))
    expect(onClose).toHaveBeenCalled()
  })
})
