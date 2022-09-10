import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import CreateRecipeFormWrapper from 'src/lib/tests/components/CreateRecipeFormWrapper'

import RecipeIngredientForm from './RecipeIngredientForm'

describe('RecipeIngredientForm', () => {
  beforeEach(() => {
    render(
      <CreateRecipeFormWrapper>
        <RecipeIngredientForm ingredientIndex={0} />
      </CreateRecipeFormWrapper>
    )
  })

  it('should have a sub group name label', () => {
    expect(screen.getByText('Sub Group Name')).toBeInTheDocument()
  })

  it('should have an ingredients list label', () => {
    expect(screen.getByText('Ingredients List')).toBeInTheDocument()
  })

  it('should have an add ingredient button', () => {
    expect(screen.getByText('+ Add Ingredient')).toBeInTheDocument()
  })

  it('should initialise with one ingredient item field', () => {
    const inputs = screen.getAllByLabelText('Ingredient item')
    expect(inputs.length).toEqual(1)
  })

  it('should add a new ingredient item when add button is clicked', async () => {
    const inputsBefore = screen.getAllByLabelText('Ingredient item')
    await waitFor(() => userEvent.type(inputsBefore[0], 'Salt'))

    const addButton = screen.getByText('+ Add Ingredient')
    await waitFor(() => userEvent.click(addButton))

    const inputsAfter = screen.getAllByLabelText('Ingredient item')
    expect(inputsAfter.length).toEqual(2)
  })

  it('should remove an item when the remove button is clicked', async () => {
    const inputsBefore = screen.getAllByLabelText('Ingredient item')
    await waitFor(() => userEvent.type(inputsBefore[0], 'Salt'))

    const addButton = screen.getByText('+ Add Ingredient')
    await waitFor(() => userEvent.click(addButton))

    const deleteButton = screen.getAllByLabelText('Delete ingredient')[0]
    await waitFor(() => userEvent.click(deleteButton))

    const inputsAfter = screen.getAllByLabelText('Ingredient item')
    expect(inputsAfter.length).toEqual(1)
  })
})
