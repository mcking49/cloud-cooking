import { Heading, HeadingProps } from '@chakra-ui/react'

const H2 = ({ children, ...props }: HeadingProps) => (
  <Heading {...props} as="h2" variant="h2">
    {children}
  </Heading>
)

export default H2
