import { useRef } from 'react'

import { Box } from '@chakra-ui/react'

import { EditRecipeLayoutProvider } from './EditRecipeLayoutContext'

const EditRecipeMobileLayout: React.FC = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null)
  return (
    <EditRecipeLayoutProvider value={{ headerRef }}>
      <Box ref={headerRef} />

      <Box width="full" height="full" paddingY={4} paddingX={5}>
        {children}
      </Box>
    </EditRecipeLayoutProvider>
  )
}

export default EditRecipeMobileLayout
