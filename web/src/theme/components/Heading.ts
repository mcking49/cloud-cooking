import { ComponentStyleConfig } from '@chakra-ui/react'

const Heading: ComponentStyleConfig = {
  variants: {
    h2: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '20px',
    },
    h3: {
      fontFamily: 'PT Sans',
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '1.2em',
    },
  },
}

export default Heading
