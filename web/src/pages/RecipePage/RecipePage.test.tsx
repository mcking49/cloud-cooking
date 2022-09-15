import { render } from '@redwoodjs/testing/web'

import RecipePage from './RecipePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('RecipePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecipePage id={1} />)
    }).not.toThrow()
  })
})
