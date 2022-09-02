import { render } from '@redwoodjs/testing/web'

import RecipeDirectionsForm from './RecipeDirectionsForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RecipeDirectionsForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecipeDirectionsForm />)
    }).not.toThrow()
  })
})
