import CreateRecipeFormWrapper from 'src/lib/tests/components/CreateRecipeFormWrapper'

import RecipeIngredientsForm from './RecipeIngredientsForm'

export const generated = (args) => {
  return (
    <CreateRecipeFormWrapper>
      <RecipeIngredientsForm {...args} />
    </CreateRecipeFormWrapper>
  )
}

export default { title: 'Components/RecipeIngredientsForm' }
