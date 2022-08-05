import {
  IconButton as ChakraIconButton,
  IconButtonProps,
} from '@chakra-ui/react'

export const IconButton: React.FC<IconButtonProps> = ({ ...props }) => (
  <ChakraIconButton
    bg="blue.800"
    color="white"
    fontSize="20px"
    _hover={{
      bg: 'blue.700',
    }}
    _active={{
      bg: 'blue.700',
    }}
    shadow="md"
    {...props}
  />
)
