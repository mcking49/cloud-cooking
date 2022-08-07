import { FaSearch } from 'react-icons/fa'

import { render, screen } from '@redwoodjs/testing/web'

import SideMenuLink from './SideMenuLink'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SideMenuLink', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SideMenuLink icon={FaSearch} to="" />)
    }).not.toThrow()
  })

  it('should render children', () => {
    const label = 'Explore'
    render(
      <SideMenuLink icon={FaSearch} to="">
        {label}
      </SideMenuLink>
    )

    expect(screen.getByText(label)).toBeInTheDocument()
  })
})
