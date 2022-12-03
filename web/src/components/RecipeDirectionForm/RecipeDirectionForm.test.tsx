import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import CreateRecipeFormWrapper from 'src/lib/tests/components/CreateRecipeFormWrapper'

import RecipeDirectionForm from './RecipeDirectionForm'

describe('RecipeDirectionForm', () => {
  beforeEach(() => {
    render(
      <CreateRecipeFormWrapper>
        <RecipeDirectionForm directionIndex={0} />
      </CreateRecipeFormWrapper>
    )
  })

  it('should have a sub group name label', () => {
    expect(screen.getByText('Sub Group Name')).toBeInTheDocument()
  })

  it('should have a method label', () => {
    expect(screen.getByText('Method')).toBeInTheDocument()
  })

  it('should have an add step button', () => {
    expect(screen.getByText('+ Add Step')).toBeInTheDocument()
  })

  it('should initialise with one method item field', () => {
    const inputs = screen.getAllByLabelText('Method item')
    expect(inputs.length).toEqual(1)
  })

  it('should add a new method item when add button is clicked', async () => {
    const inputsBefore = screen.getAllByLabelText('Method item')
    await waitFor(() => userEvent.type(inputsBefore[0], 'Do this'))

    const addButton = screen.getByText('+ Add Step')
    await waitFor(() => userEvent.click(addButton))

    const inputsAfter = screen.getAllByLabelText('Method item')
    expect(inputsAfter.length).toEqual(2)
  })

  it('should remove an item when the remove button is clicked', async () => {
    const inputsBefore = screen.getAllByLabelText('Method item')
    await waitFor(() => userEvent.type(inputsBefore[0], 'Do this'))

    const addButton = screen.getByText('+ Add Step')
    await waitFor(() => userEvent.click(addButton))

    const deleteButton = screen.getAllByLabelText('Delete method')[0]
    await waitFor(() => userEvent.click(deleteButton))

    const inputsAfter = screen.getAllByLabelText('Method item')
    expect(inputsAfter.length).toEqual(1)
  })
})
