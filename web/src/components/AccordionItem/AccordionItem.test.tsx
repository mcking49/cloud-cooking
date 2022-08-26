import { Accordion } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'

import { render, screen } from '@redwoodjs/testing/web'

import AccordionItem from './AccordionItem'

describe('AccordionItem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <Accordion>
          <AccordionItem heading="Heading" />
        </Accordion>
      )
    }).not.toThrow()
  })

  it('renders heading', () => {
    const heading = faker.company.name()

    render(
      <Accordion>
        <AccordionItem heading={heading} />
      </Accordion>
    )

    expect(screen.getByText(heading)).toBeInTheDocument()
  })
})
