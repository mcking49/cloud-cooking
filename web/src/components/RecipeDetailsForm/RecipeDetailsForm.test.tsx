import { render, screen } from '@redwoodjs/testing/web'

import Form from '../Form'

import RecipeDetailsForm from './RecipeDetailsForm'

describe('RecipeDetailsForm', () => {
  beforeEach(() => {
    render(
      <Form>
        <RecipeDetailsForm />
      </Form>
    )
  })

  it('should have a name field', () => {
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('should have a category field', () => {
    expect(screen.getByText('Category')).toBeInTheDocument()
  })
})
