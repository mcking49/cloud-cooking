import { render, screen } from '@redwoodjs/testing/web'

import EditRecipeMobileLayout from 'src/layouts/EditRecipeMobileLayout/EditRecipeMobileLayout'

import CreateRecipePage from './CreateRecipePage'

describe('CreateRecipePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateRecipePage />)
    }).not.toThrow()
  })

  it('should have a header inside the mobile layout', () => {
    render(
      <EditRecipeMobileLayout>
        <CreateRecipePage />
      </EditRecipeMobileLayout>
    )

    expect(screen.getByText('Cloud')).toBeInTheDocument()
    expect(screen.getByText('Cooking.')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })
})
