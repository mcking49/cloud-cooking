import * as mediaQueryHooks from '@chakra-ui/media-query'
import { VStack } from '@chakra-ui/react'

import { render } from '@redwoodjs/testing/web'

import SignupPage from './SignupPage'

describe('SignupPage', () => {
  beforeEach(() => {
    jest
      .spyOn(mediaQueryHooks, 'useBreakpointValue')
      .mockImplementation(() => VStack)
  })

  it('renders successfully', () => {
    expect(() => {
      render(<SignupPage />)
    }).not.toThrow()
  })
})
