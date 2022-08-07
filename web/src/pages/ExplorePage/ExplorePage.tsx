import { Box } from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { SideMenuHeader } from 'src/layouts/SideMenuLayout'

const ExplorePage = () => {
  return (
    <>
      <MetaTags title="Explore" description="Explore page" />

      <SideMenuHeader>hello world</SideMenuHeader>

      <h1>ExplorePage</h1>
      <p>
        Find me in <code>./web/src/pages/ExplorePage/ExplorePage.tsx</code>
      </p>
      <p>
        My default route is named <code>explore</code>, link to me with `
        <Link to={routes.explore()}>Explore</Link>`
      </p>

      <Box height="2000px" bg="red"></Box>
    </>
  )
}

export default ExplorePage
