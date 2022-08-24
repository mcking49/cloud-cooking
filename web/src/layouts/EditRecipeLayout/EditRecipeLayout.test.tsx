import { render } from '@redwoodjs/testing/web'

import EditRecipeLayout from './EditRecipeLayout'

describe('EditRecipeLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditRecipeLayout />)
    }).not.toThrow()
  })
})
