import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from '@chakra-ui/react'

export const IconButton: React.FC<IconButtonProps> = ({ ...props }) => (
  <ChakraIconButton
    bg="blue.800"
    color="white"
    fontSize="20px"
    size="sm"
    _hover={{
      bg: 'blue.700',
    }}
    _active={{
      bg: 'blue.700',
    }}
    filter="drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25))"
    {...props}
  />
)
