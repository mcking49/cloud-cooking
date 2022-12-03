import { faker } from '@faker-js/faker'

import { render, screen } from '@redwoodjs/testing/web'

import Form from '../Form'

import CategoryOption from './CategoryOption'

describe('CategoryOption', () => {
  const label = faker.company.name()
  const component = (
    <Form>
      <CategoryOption
        checkboxProps={{
          onChange: () => null,
        }}
        isInvalid={false}
        label={label}
        name="categories[0]"
      />
    </Form>
  )

  beforeEach(() => {
    render(component)
  })

  it('renders successfully', () => {
    expect(() => {
      render(component)
    }).not.toThrow()
  })

  it('displays the label', () => {
    expect(screen.getByText(label)).toBeInTheDocument()
  })
})
