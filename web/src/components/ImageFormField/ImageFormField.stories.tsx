import Form from '../Form'

import ImageFormField from './ImageFormField'

export const generated = (args) => {
  return (
    <Form>
      <ImageFormField {...args} />
    </Form>
  )
}

export default { title: 'Components/ImageFormField' }
