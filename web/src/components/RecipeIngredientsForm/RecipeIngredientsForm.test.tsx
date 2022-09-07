import { render, screen } from '@redwoodjs/testing/web'

import CreateRecipeFormWrapper from 'src/lib/tests/components/CreateRecipeFormWrapper'

import RecipeIngredientsForm from './RecipeIngredientsForm'

describe('RecipeIngredientsForm', () => {
  beforeEach(() => {
    render(
      <CreateRecipeFormWrapper>
        <RecipeIngredientsForm />
      </CreateRecipeFormWrapper>
    )
  })

  it('should have a sub group name', () => {
    expect(screen.getByText('Sub Group Name')).toBeInTheDocument()
  })
})
