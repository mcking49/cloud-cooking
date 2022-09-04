import { render } from '@redwoodjs/testing/web'

import FilePicker from './FilePicker'

describe('FilePicker', () => {
  it('renders successfully', () => {
    const text = 'Add Photo'
    expect(() => {
      render(<FilePicker accept="image/*" onSuccess={jest.fn()} text={text} />)
    }).not.toThrow()
  })
})
