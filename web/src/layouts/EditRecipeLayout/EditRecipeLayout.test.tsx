import { render } from '@redwoodjs/testing/web'

import EditRecipeLayout from './EditRecipeLayout'

describe('EditRecipeLayout', () => {
  xit('renders successfully', () => {
    expect(() => {
      render(
        <EditRecipeLayout>
          <p>hello world</p>
        </EditRecipeLayout>
      )
    }).not.toThrow()
  })
})
