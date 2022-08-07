import { Box, Flex } from '@chakra-ui/react'

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
        <Box
          position="absolute"
          zIndex="banner"
          top={{ base: '44px' }}
          left={{ base: '24px', sm: '40px' }}
          display={{ md: 'none' }}
        >
          <Logo />
        </Box>
      </Box>

      {/* Content */}
      <Flex
        bg="gray.50"
        width={{ base: 'full', md: '50%' }}
        paddingY={{ base: 10, sm: 12 }}
        paddingX={{ base: 6, sm: 10, xl: 16, '2xl': 32 }}
        roundedTop={{ base: '2xl', md: 'none' }}
        flexGrow={{ base: 1, md: 0 }}
        minWidth={{ md: '540px' }}
        flexShrink={0}
        flexDir="column"
        justifyContent={{ sm: 'flex-start', md: 'center' }}
        alignItems={{ sm: 'flex-start', md: 'center' }}
      >
        {children}
      </Flex>
    </Flex>
  )
}

export default AuthLayout
