import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const CreateRecipePage = () => {
  return (
    <>
      <MetaTags title="CreateRecipe" description="CreateRecipe page" />

      <h1>CreateRecipePage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/CreateRecipePage/CreateRecipePage.tsx</code>
      </p>
      <p>
        My default route is named <code>createRecipe</code>, link to me with `
        <Link to={routes.createRecipe()}>CreateRecipe</Link>`
      </p>
    </>
  )
}

export default CreateRecipePage
