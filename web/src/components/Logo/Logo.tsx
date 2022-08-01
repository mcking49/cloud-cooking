import { HStack, Heading, HeadingProps } from '@chakra-ui/react'

const Logo: React.FC<HeadingProps> = (props) => {
  return (
    <HStack>
      <Heading fontWeight="normal" color="green.400" {...props}>
        Cloud
      </Heading>
      <Heading fontWeight="normal" {...props}>
        Cooking.
      </Heading>
    </HStack>
  )
}

export default Logo
