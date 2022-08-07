import * as React from 'react'

import '@fontsource/vidaloka/400.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/pt-sans/400.css'
import '@fontsource/pt-sans/700.css'

import { ChakraProvider } from '@chakra-ui/react'

import theme from '../src/theme'

const withChakra = (StoryFn) => {
  return (
    <ChakraProvider theme={theme}>
      <StoryFn />
    </ChakraProvider>
  )
}

export const decorators = [withChakra]

export const parameters = {
  chakra: {
    theme,
  },
}
