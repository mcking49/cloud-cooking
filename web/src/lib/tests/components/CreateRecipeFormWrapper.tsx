import { FC } from 'react'

import { CreateRecipeInput } from 'types/graphql'

import { useForm } from '@redwoodjs/forms'

import Form from 'src/components/Form'

const DEFAULT_FORM: CreateRecipeInput = {
  categories: [],
  directionGroups: [
    {
      directions: [''],
      name: '',
    },
  ],
  ingredientGroups: [
    {
      ingredients: [''],
      name: '',
    },
  ],
  name: '',
  recipeImageIds: [],
}

const CreateRecipeFormWrapper: FC = ({ children }) => {
  const formMethods = useForm({
    defaultValues: DEFAULT_FORM,
  })

  return <Form formMethods={formMethods}>{children}</Form>
}

export default CreateRecipeFormWrapper
