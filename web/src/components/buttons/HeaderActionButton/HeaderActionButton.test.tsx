import { faker } from '@faker-js/faker'

import { render, screen } from '@redwoodjs/testing/web'

import HeaderActionButton from './HeaderActionButton'

describe('HeaderActionButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HeaderActionButton />)
    }).not.toThrow()
  })

  it('renders children', () => {
    const name = faker.random.word()
    render(<HeaderActionButton>{name}</HeaderActionButton>)

    expect(screen.getByText(name)).toBeInTheDocument()
  })
})
