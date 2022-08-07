import UserDetails from './UserDetails'
import { standard } from './UserDetails.mock'

export const userNotLoggedIn = () => {
  mockCurrentUser(null)
  return <UserDetails />
}

export const userLoggedIn = () => {
  mockCurrentUser({ ...standard() })
  return <UserDetails />
}

export default { title: 'Components/UserDetails' }
