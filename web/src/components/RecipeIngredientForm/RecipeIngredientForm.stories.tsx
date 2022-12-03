import CreateRecipeFormWrapper from 'src/lib/tests/components/CreateRecipeFormWrapper'

import RecipeIngredientForm from './RecipeIngredientForm'

export const generated = (args) => {
  return (
    <CreateRecipeFormWrapper>
      <RecipeIngredientForm {...args} />
    </CreateRecipeFormWrapper>
  )
}

export default { title: 'Components/RecipeIngredientForm' }
