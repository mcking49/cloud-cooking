import { render } from '@redwoodjs/testing/web'

import FavouritesPage from './FavouritesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FavouritesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FavouritesPage />)
    }).not.toThrow()
  })
})
