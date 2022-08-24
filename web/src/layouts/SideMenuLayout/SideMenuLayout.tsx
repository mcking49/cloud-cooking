import { useEffect, useRef, useState } from 'react'

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { debounce } from 'lodash/fp'

import MenuButton from 'src/components/buttons/MenuButton'
import Splash from 'src/components/Splash'

import SideMenuNav from './SideMenuNav'

import { SideMenuLayoutProvider } from '.'

export const SideMenuLayout: React.FC = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>()
  const navMenu = useDisclosure()

  const isNavMenuOpen = useBreakpointValue({
    base: navMenu.isOpen,
    xl: false,
  })

  const headerHeight = useBreakpointValue({
    base: 200,
    xl: 320,
  })

  const [contentHeight, setContentHeight] = useState(
    window.innerHeight - headerHeight
  )

  useEffect(() => {
    const handleResize = () => {
      setContentHeight(window.innerHeight - headerHeight)
    }

    const debouncedHandleResize = debounce(100)(handleResize)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [headerHeight])

  return (
    <SideMenuLayoutProvider value={{ headerRef }}>
      <Flex height="100vh" overflow="hidden" width="100vw">
        {/* Left Navigation Menu Mobile */}
        <Drawer
          isOpen={isNavMenuOpen}
          onClose={navMenu.onClose}
          closeOnEsc={false}
          placement="left"
        >
          <DrawerOverlay />

          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody padding={0}>
              <SideMenuNav onClose={navMenu.onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Left Navigation Menu Desktop */}
        <Box
          width="320px"
          flexShrink={0}
          flexGrow={0}
          height="full"
          background="white"
          shadow="navMenu"
          zIndex={1}
          display={{ base: 'none', xl: 'block' }}
        >
          <SideMenuNav />
        </Box>

        {/* Right Header and Content */}
        <Flex
          flexDir="column"
          height="full"
          flexShrink={0}
          flexGrow={1}
          width={{ base: 'full', xl: 'calc(100% - 320px)' }}
        >
          {/* Header container */}
          {/* Optimisation: Set splash image as the background image via styles. This will make using "Box" parent component */}
          {/* and inner content "VStack" component redundant. They can be merged. */}
          <Box
            width="full"
            height={headerHeight}
            marginBottom={{ base: -4, xl: 0 }}
            flexGrow={0}
            flexShrink={0}
            position="relative"
          >
            <Splash />

            {/* Inner header content */}
            <VStack
              height="full"
              width="full"
              position="absolute"
              top={0}
              padding={4}
              paddingBottom={8}
              spacing={0}
              alignItems="flex-start"
            >
              <HStack width="full">
                <MenuButton
                  onClick={navMenu.onOpen}
                  display={{ base: 'flex', xl: 'none' }}
                />

                {/* Will be able to slot in other top level buttons here */}
              </HStack>

              {/* Header slot container. Children from <SideMenuHeader>{children}</SideMenuHeader> get Portalled here */}
              <Box flexGrow={1} width="full" ref={headerRef} />
            </VStack>
          </Box>

          {/* Content */}
          <Box
            bg="gray.50"
            width="full"
            paddingY={{ base: 10, sm: 12 }}
            paddingX={{ base: 6, sm: 10 }}
            roundedTop={{ base: '2xl', xl: 'none' }}
            height={contentHeight}
            flexGrow={1}
            flexShrink={0}
            zIndex={{ base: 1, xl: 'initial' }}
            overflow="auto"
          >
            {children}
          </Box>
        </Flex>
      </Flex>
    </SideMenuLayoutProvider>
  )
}
