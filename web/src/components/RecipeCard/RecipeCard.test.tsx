import { render } from '@redwoodjs/testing/web'

import RecipeCard from './RecipeCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RecipeCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecipeCard />)
    }).not.toThrow()
  })
})
