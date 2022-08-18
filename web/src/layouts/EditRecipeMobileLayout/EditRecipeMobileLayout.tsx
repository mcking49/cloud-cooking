import { useRef } from 'react'

import { Box } from '@chakra-ui/react'

import { EditRecipeLayoutProvider } from './EditRecipeLayoutContext'

const EditRecipeMobileLayout: React.FC = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null)
  return (
    <EditRecipeLayoutProvider value={{ headerRef }}>
      <Box ref={headerRef} />

      {children}
    </EditRecipeLayoutProvider>
  )
}

export default EditRecipeMobileLayout
