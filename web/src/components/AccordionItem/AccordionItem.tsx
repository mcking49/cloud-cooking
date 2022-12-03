import {
  AccordionButton,
  AccordionIcon,
  AccordionItem as ChakraAccordionItem,
  AccordionItemProps,
  AccordionPanel,
} from '@chakra-ui/react'

import H2 from '../typography/H2'

interface Props extends AccordionItemProps {
  heading: string
}

/**
 * Must be used inside Chakra's `Accordion` component
 */
const AccordionItem = ({ children, heading, ...props }: Props) => {
  return (
    <ChakraAccordionItem {...props}>
      {({ isExpanded }) => (
        <>
          <AccordionButton borderBottomRadius={isExpanded ? '0px' : '8px'}>
            <H2>{heading}</H2>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>{children}</AccordionPanel>
        </>
      )}
    </ChakraAccordionItem>
  )
}

export default AccordionItem
