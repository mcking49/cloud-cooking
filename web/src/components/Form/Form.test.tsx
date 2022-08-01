import { render, screen } from '@redwoodjs/testing/web'

import Form from './Form'

describe('Form', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Form />)
    }).not.toThrow()
  })

  it('renders children', () => {
    const child = 'Hello test form'

    render(
      <Form>
        <p>{child}</p>
      </Form>
    )

    expect(screen.getByText(child)).toBeInTheDocument()
  })
})
