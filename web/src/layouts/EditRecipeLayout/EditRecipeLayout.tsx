import { useBreakpointValue } from '@chakra-ui/react'

import EditRecipeMobileLayout from '../EditRecipeMobileLayout'
import { SideMenuLayout } from '../SideMenuLayout'

type EditRecipeLayoutProps = {
  children?: React.ReactNode
}

const EditRecipeLayout = ({ children }: EditRecipeLayoutProps) => {
  const Layout = useBreakpointValue({
    base: EditRecipeMobileLayout,
    xl: SideMenuLayout,
  })

  return <Layout>{children}</Layout>
}

export default EditRecipeLayout
