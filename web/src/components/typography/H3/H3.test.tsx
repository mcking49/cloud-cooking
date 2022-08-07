import { faker } from '@faker-js/faker'

import { render, screen } from '@redwoodjs/testing/web'

import H3 from './H3'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('H3', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<H3 />)
    }).not.toThrow()
  })

  it('renders given children', () => {
    const sentence = faker.lorem.sentence(5)
    render(<H3>{sentence}</H3>)
    expect(screen.getByText(sentence)).toBeInTheDocument()
  })
})
