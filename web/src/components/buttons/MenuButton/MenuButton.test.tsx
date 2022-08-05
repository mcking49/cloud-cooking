import { render } from '@redwoodjs/testing/web'

import MenuButton from './MenuButton'

describe('MenuButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MenuButton />)
    }).not.toThrow()
  })
})
