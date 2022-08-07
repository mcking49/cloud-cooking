import { Portal } from '@chakra-ui/react'

import { SideMenuLayoutContext } from './SideMenuLayoutContext'

export const SideMenuHeader = ({ children }) => (
  <SideMenuLayoutContext.Consumer>
    {({ headerRef }) => <Portal containerRef={headerRef}>{children}</Portal>}
  </SideMenuLayoutContext.Consumer>
)
