import { Private, Route, Router, Set } from '@redwoodjs/router'

import AuthLayout from './layouts/AuthLayout/AuthLayout'
import SideMenuLayout from './layouts/SideMenuLayout/SideMenuLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="login" wrap={SideMenuLayout}>
        <Route path="/explore" page={ExplorePage} name="explore" />
        <Route path="/create-recipe" page={CreateRecipePage} name="createRecipe" />
        <Route path="/favourites" page={FavouritesPage} name="favourites" />
      </Private>

      <Set wrap={AuthLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
      </Set>

      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
