import { render } from '@redwoodjs/testing/web'

import CategoryFilters from './CategoryFilters'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CategoryFilters', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CategoryFilters />)
    }).not.toThrow()
  })
})
