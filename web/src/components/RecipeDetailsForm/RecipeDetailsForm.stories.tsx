import CreateRecipeFormWrapper from 'src/lib/tests/components/CreateRecipeFormWrapper'

import RecipeDetailsForm from './RecipeDetailsForm'

export const generated = (args) => {
  return (
    <CreateRecipeFormWrapper>
      <RecipeDetailsForm {...args} />
    </CreateRecipeFormWrapper>
  )
}

export default { title: 'Components/RecipeDetailsForm' }
