import { ReactNode } from 'react'

import { Flex, Portal, useBreakpointValue } from '@chakra-ui/react'

import { EditRecipeLayoutContext } from '../EditRecipeLayoutContext'

type Props = {
  children: ReactNode
}

const EditRecipeHeader = ({ children }: Props) => {
  const showHeader = useBreakpointValue({ base: true, xl: false })

  if (!showHeader) {
    return null
  }

  return (
    <EditRecipeLayoutContext.Consumer>
      {({ headerRef }) => (
        <Portal appendToParentPortal={false} containerRef={headerRef}>
          <Flex
            py={3}
            px={4}
            shadow="navMenu"
            justifyContent="space-between"
            alignItems="center"
          >
            {children}
          </Flex>
        </Portal>
      )}
    </EditRecipeLayoutContext.Consumer>
  )
}

export default EditRecipeHeader
