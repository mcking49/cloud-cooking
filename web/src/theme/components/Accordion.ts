import { ComponentMultiStyleConfig } from '@chakra-ui/react'

const Accordion: Partial<ComponentMultiStyleConfig> = {
  baseStyle: {
    button: {
      background: 'gray.100',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 4,
    },
    container: {
      border: 'none',
      marginBottom: 4,
    },
    icon: {
      fontSize: '28px',
    },
    panel: {
      borderWidth: '2px',
      borderColor: 'gray.100',
      borderTop: 'none',
      borderBottomRadius: '8px',
    },
  },
}

export default Accordion
