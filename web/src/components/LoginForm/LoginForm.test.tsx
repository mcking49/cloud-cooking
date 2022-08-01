import { render, screen } from '@redwoodjs/testing/web'

import LoginForm from './LoginForm'

describe('LoginForm', () => {
  beforeEach(() => {
    render(<LoginForm />)
  })

  it('renders successfully', () => {
    expect(() => {
      render(<LoginForm />)
    }).not.toThrow()
  })

  it('should have a Login heading', () => {
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('should have an "Don\'t have an account?" option', () => {
    expect(screen.getByText("Don't have a login?")).toBeInTheDocument()
  })

  it('should have a "Create an account" button', () => {
    expect(screen.getByText('Create an account')).toBeInTheDocument()
  })

  it('should have "email" field', () => {
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
  })

  it('should have "password" field', () => {
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('should have a "Sign in" button', () => {
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })

  xit('should not submit the form when the form is invalid', () => {
    // Insert valid test case here
  })

  xit('should submit the form when the form is valid', () => {
    // Insert valid test case here
  })

  xit('should route to signup page when clicking the create account button', () => {
    // Insert valid test case here
  })
})
