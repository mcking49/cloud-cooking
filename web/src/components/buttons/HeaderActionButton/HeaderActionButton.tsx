import { Button, ButtonProps } from '@chakra-ui/react'

const HeaderActionButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      variant="link"
      colorScheme="blue"
      color="blue.800"
      fontWeight={400}
      width="70px"
      fontSize="14px"
      {...props}
    >
      {children}
    </Button>
  )
}

export default HeaderActionButton
