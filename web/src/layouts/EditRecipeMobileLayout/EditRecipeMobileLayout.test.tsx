import { render } from '@redwoodjs/testing/web'

import EditRecipeMobileLayout from './EditRecipeMobileLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EditRecipeMobileLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditRecipeMobileLayout />)
    }).not.toThrow()
  })
})
