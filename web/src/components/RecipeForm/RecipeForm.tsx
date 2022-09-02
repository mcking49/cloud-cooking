import { useEffect } from 'react'

import { Accordion } from '@chakra-ui/react'
import type { CreateRecipeInput } from 'types/graphql'

import { useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import AccordionItem from '../AccordionItem'
import Form from '../Form'
import RecipeDetailsForm from '../RecipeDetailsForm'
import RecipeDirectionsForm from '../RecipeDirectionsForm'
import RecipeIngredientsForm from '../RecipeIngredientsForm'

const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipeMutation($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      id
    }
  }
`

const defaultForm: CreateRecipeInput = {
  categories: [],
  directionGroups: [
    {
      directions: [],
      name: '',
    },
  ],
  ingredientGroups: [
    {
      ingredients: [],
      name: '',
    },
  ],
  name: '',
  recipeImages: [],
}

const RecipeForm = () => {
  const formMethods = useForm<CreateRecipeInput>({
    defaultValues: defaultForm,
    mode: 'onBlur',
  })

  const watchForm = formMethods.watch()

  const [_createRecipe] = useMutation(CREATE_RECIPE_MUTATION)

  const onSubmit = (data: CreateRecipeInput) => {
    console.log('Submit recipe:', data)

    if (data.categories.length) {
      data.categories = data.categories.filter((cat) => typeof cat === 'string')
    }
  }

  useEffect(() => {
    // TODO: delete me
    console.log(watchForm)
  }, [watchForm])

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit}>
      <Accordion defaultIndex={[0]} allowMultiple allowToggle>
        <AccordionItem heading="Details">
          <RecipeDetailsForm />
        </AccordionItem>

        <AccordionItem heading="Ingredients">
          <RecipeIngredientsForm />
        </AccordionItem>

        <AccordionItem heading="Directions">
          <RecipeDirectionsForm />
        </AccordionItem>
      </Accordion>
    </Form>
  )
}

export default RecipeForm
