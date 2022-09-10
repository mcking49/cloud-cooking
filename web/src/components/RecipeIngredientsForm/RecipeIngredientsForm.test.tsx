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

  it('should have an add sub group button', () => {
    expect(screen.getByText('+ Add Sub Group')).toBeInTheDocument()
  })
})
