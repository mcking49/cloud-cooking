import { Box, Flex, Hide } from '@chakra-ui/react'

import Logo from 'src/components/Logo'
import Splash from 'src/components/Splash'

const AuthLayout: React.FC = ({ children }) => {
  return (
    <Flex flexDir={{ base: 'column', md: 'row' }} minHeight="100vh">
      {/* Splash with Logo */}
      <Box
        width={{ base: 'full', md: '50%' }}
        height={{ base: '140px', md: '100vh' }}
        overflow="hidden"
        marginBottom={{ base: -3.5, md: 0 }}
        flexGrow={{ base: 0, md: 1 }}
        flexShrink={{ base: 0, md: 1 }}
        position={{ base: 'relative', md: 'unset' }}
        zIndex={{ base: -1, md: 'unset' }}
      >
        <Splash />

        {/* Show logo only on mobile */}
        <Hide above="md">
          <Box
            position="absolute"
            zIndex="banner"
            top={{ base: '44px' }}
            left={{ base: '24px' }}
          >
            <Logo />
          </Box>
        </Hide>
      </Box>

      {/* Content */}
      <Box
        bg="gray.50"
        width={{ base: 'full', md: '50%' }}
        paddingY={10}
        paddingX={6}
        roundedTop={{ base: '2xl', md: 'none' }}
        flexGrow={{ base: 1, md: 0 }}
        minWidth={{ md: '540px' }}
        flexShrink={0}
      >
        {children}
      </Box>
    </Flex>
  )
}

export default AuthLayout
