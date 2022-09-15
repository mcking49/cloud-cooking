import { render, screen } from '@redwoodjs/testing/web'

import CreateRecipeFormWrapper from 'src/lib/tests/components/CreateRecipeFormWrapper'

import RecipeDirectionsForm from './RecipeDirectionsForm'

describe('RecipeDirectionsForm', () => {
  beforeEach(() => {
    render(
      <CreateRecipeFormWrapper>
        <RecipeDirectionsForm />
      </CreateRecipeFormWrapper>
    )
  })

  it('should have an add sub group button', () => {
    expect(screen.getByText('+ Add Sub Group')).toBeInTheDocument()
  })
})
