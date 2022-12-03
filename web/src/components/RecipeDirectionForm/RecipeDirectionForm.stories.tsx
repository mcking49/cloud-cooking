import CreateRecipeFormWrapper from 'src/lib/tests/components/CreateRecipeFormWrapper'

import RecipeDirectionForm from './RecipeDirectionForm'

export const generated = (args) => {
  return (
    <CreateRecipeFormWrapper>
      <RecipeDirectionForm {...args} />
    </CreateRecipeFormWrapper>
  )
}

export default { title: 'Components/RecipeDirectionForm' }
