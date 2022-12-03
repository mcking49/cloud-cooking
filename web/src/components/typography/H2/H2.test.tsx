import { faker } from '@faker-js/faker'

import { render, screen } from '@redwoodjs/testing/web'

import H2 from './H2'

describe('H2', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<H2 />)
    }).not.toThrow()
  })

  it('renders given children', () => {
    const sentence = faker.lorem.sentence(5)
    render(<H2>{sentence}</H2>)
    expect(screen.getByText(sentence)).toBeInTheDocument()
  })
})
