import { ComponentStyleConfig } from '@chakra-ui/react'

const FormLabel: ComponentStyleConfig = {
  variants: {
    caption: {
      fontFamily: 'PT Sans',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '1.2em',
    },
    hint: {
      color: 'gray.400',
      textAlign: 'center',
    },
  },
}

export default FormLabel
