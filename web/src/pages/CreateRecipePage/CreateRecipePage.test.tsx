import { render } from '@redwoodjs/testing/web'

import CreateRecipePage from './CreateRecipePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateRecipePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateRecipePage />)
    }).not.toThrow()
  })
})
