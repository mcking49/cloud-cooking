import { render } from '@redwoodjs/testing/web'

import RecipeIngredientsForm from './RecipeIngredientsForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RecipeIngredientsForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecipeIngredientsForm />)
    }).not.toThrow()
  })
})
