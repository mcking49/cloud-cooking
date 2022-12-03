import { Accordion } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'

import AccordionItem from './AccordionItem'

export const generated = () => {
  return (
    <Accordion allowToggle>
      <AccordionItem heading={faker.company.name()}>
        {faker.lorem.paragraphs(3)}
      </AccordionItem>
    </Accordion>
  )
}

export default { title: 'Components/AccordionItem' }
