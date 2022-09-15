import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

type Props = {
  id: number
}

const RecipePage = ({ id }: Props) => {
  return (
    <>
      <MetaTags title="Recipe" description="Recipe page" />

      <h1>RecipePage</h1>
      <p>
        Find me in <code>./web/src/pages/RecipePage/RecipePage.tsx</code>
      </p>
      <p>
        My default route is named <code>recipe</code>, link to me with `
        <Link to={routes.recipe({ id })}>Recipe</Link>`
      </p>
    </>
  )
}

export default RecipePage
