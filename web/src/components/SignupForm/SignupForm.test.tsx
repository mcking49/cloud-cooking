import * as mediaQueryHooks from '@chakra-ui/media-query'
import { VStack } from '@chakra-ui/react'

import { render, screen } from '@redwoodjs/testing/web'

import SignupForm from './SignupForm'

describe('SignupForm', () => {
  beforeEach(() => {
    jest
      .spyOn(mediaQueryHooks, 'useBreakpointValue')
      .mockImplementation(() => VStack)

    render(<SignupForm />)
  })

  it('renders successfully', () => {
    expect(() => {
      render(<SignupForm />)
    }).not.toThrow()
  })

  it('should have a create account heading', () => {
    expect(screen.getByText('Create an account')).toBeInTheDocument()
  })

  it('should have an "account exist?" subheading', () => {
    expect(screen.getByText('Already have an account?')).toBeInTheDocument()
  })

  it('should have a login button', () => {
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })

  it('should have "firstName" field', () => {
    expect(screen.getByLabelText('First Name')).toBeInTheDocument()
  })

  it('should have "lastName" field', () => {
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument()
  })

  it('should have "email" field', () => {
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
  })

  it('should have "password" field', () => {
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('should have a submit button', () => {
    expect(screen.getByText('Create Account')).toBeInTheDocument()
  })

  xit('should not submit the form when the form is invalid', () => {
    // Insert valid test case here
  })

  xit('should submit the form when the form is valid', () => {
    // Insert valid test case here
  })
})
