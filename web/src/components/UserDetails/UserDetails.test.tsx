import { CurrentUser } from '@redwoodjs/auth'
import { render, screen, waitFor } from '@redwoodjs/testing/web'

import UserDetails from './UserDetails'
import { standard } from './UserDetails.mock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserDetails />)
    }).not.toThrow()
  })

  describe('when user is logged in', () => {
    let currentUser: CurrentUser

    beforeEach(() => {
      currentUser = { ...standard() }
      mockCurrentUser(currentUser)
      render(<UserDetails />)
    })

    it('displays the logged in users name', async () => {
      await waitFor(() => {
        expect(
          screen.getByText(`${currentUser.firstName} ${currentUser.lastName}`)
        ).toBeInTheDocument()
      })
    })

    it('displays the logged in users email', async () => {
      await waitFor(() => {
        expect(screen.getByText(currentUser.email)).toBeInTheDocument()
      })
    })
  })
})
