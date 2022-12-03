import { render } from '@redwoodjs/testing/web'

import Form from '../Form'

import ImageFormField from './ImageFormField'

describe('ImageFormField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <Form>
          <ImageFormField />
        </Form>
      )
    }).not.toThrow()
  })
})
