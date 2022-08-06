import { Heading, HeadingProps } from '@chakra-ui/react'

const H3: React.FC<HeadingProps> = ({ children, ...props }) => (
  <Heading {...props} as="h3" variant="h3">
    {children}
  </Heading>
)

export default H3
