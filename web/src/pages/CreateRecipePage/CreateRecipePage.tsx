import { MetaTags } from '@redwoodjs/web'

import RecipeForm from 'src/components/RecipeForm'

const CreateRecipePage = () => {
  return (
    <>
      <MetaTags title="CreateRecipe" description="CreateRecipe page" />

      <RecipeForm />
    </>
  )
}

export default CreateRecipePage
