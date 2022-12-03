import { Private, Route, Router, Set } from '@redwoodjs/router'

import AuthLayout from './layouts/AuthLayout'
import EditRecipeLayout from './layouts/EditRecipeLayout'
import { SideMenuLayout } from './layouts/SideMenuLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="login" wrap={SideMenuLayout}>
        <Route path="/explore" page={ExplorePage} name="explore" />
        <Route path="/favourites" page={FavouritesPage} name="favourites" />
        <Route path="/recipe/{id:Int}" page={RecipePage} name="recipe" />
      </Private>

      <Private unauthenticated="login" wrap={EditRecipeLayout}>
        <Route path="/create-recipe" page={CreateRecipePage} name="createRecipe" />
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
