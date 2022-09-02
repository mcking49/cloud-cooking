import { render } from '@redwoodjs/testing/web'

import RecipeForm from './RecipeForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RecipeForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecipeForm />)
    }).not.toThrow()
  })
})
