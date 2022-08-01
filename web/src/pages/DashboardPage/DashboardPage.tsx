import { Button } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const DashboardPage = () => {
  const { logOut } = useAuth()

  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />

      <h1>DashboardPage</h1>
      <p>
        Find me in <code>./web/src/pages/DashboardPage/DashboardPage.tsx</code>
      </p>
      <p>
        My default route is named <code>dashboard</code>, link to me with `
        <Link to={routes.dashboard()}>Dashboard</Link>`
        <Button onClick={logOut}>Log out</Button>
      </p>
    </>
  )
}

export default DashboardPage
