import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const FavouritesPage = () => {
  return (
    <>
      <MetaTags title="Favourites" description="Favourites page" />

      <h1>FavouritesPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/FavouritesPage/FavouritesPage.tsx</code>
      </p>
      <p>
        My default route is named <code>favourites</code>, link to me with `
        <Link to={routes.favourites()}>Favourites</Link>`
      </p>
    </>
  )
}

export default FavouritesPage
