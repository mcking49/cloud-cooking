import { render, screen } from '@redwoodjs/testing/web'

import CreateRecipeFormWrapper from 'src/lib/tests/components/CreateRecipeFormWrapper'

import RecipeDetailsForm from './RecipeDetailsForm'

describe('RecipeDetailsForm', () => {
  beforeEach(() => {
    render(
      <CreateRecipeFormWrapper>
        <RecipeDetailsForm />
      </CreateRecipeFormWrapper>
    )
  })

  it('should have a name field', () => {
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('should have a category field', () => {
    expect(screen.getByText('Category')).toBeInTheDocument()
  })

  it('should have a length field', () => {
    expect(screen.getByText('Length')).toBeInTheDocument()
  })

  it('should have a servings field', () => {
    expect(screen.getByText('Servings')).toBeInTheDocument()
  })

  it('should have a recipeImages field', () => {
    expect(screen.getByText('Photo')).toBeInTheDocument()
  })

  it('should have a sourceUrl field', () => {
    expect(screen.getByText('Source Link')).toBeInTheDocument()
  })
})
