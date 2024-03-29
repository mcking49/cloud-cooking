import { Accordion, Button } from '@chakra-ui/react'
import { BsCheck } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import type { CreateRecipeInput, Recipe } from 'types/graphql'

import { useForm } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import EditRecipeHeader from 'src/layouts/EditRecipeMobileLayout/EditRecipeHeader'

import AccordionItem from '../AccordionItem'
import HeaderActionButton from '../buttons/HeaderActionButton'
import Form from '../Form'
import Logo from '../Logo'
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

const RecipeForm = () => {
  const formMethods = useForm<CreateRecipeInput>({
    defaultValues: defaultForm,
    mode: 'onBlur',
    shouldFocusError: false,
  })

  const [createRecipe] = useMutation<{ createRecipe: Partial<Recipe> }>(
    CREATE_RECIPE_MUTATION
  )

  const onSubmit = async (data: CreateRecipeInput) => {
    if (data.categories.length) {
      data.categories = data.categories.filter((cat) => typeof cat === 'string')
    }

    if (isNaN(data.length)) {
      delete data.length
    }

    if (isNaN(data.servings)) {
      delete data.servings
    }

    try {
      const response = await createRecipe({ variables: { input: data } })

      navigate(routes.recipe({ id: response.data.createRecipe.id }))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form formMethods={formMethods}>
      <EditRecipeHeader>
        <HeaderActionButton leftIcon={<IoMdClose />} type="button">
          Cancel
        </HeaderActionButton>
        <Logo fontSize="24px" />
        <HeaderActionButton
          leftIcon={<BsCheck />}
          type="button"
          onClick={formMethods.handleSubmit(onSubmit)}
        >
          Save
        </HeaderActionButton>
      </EditRecipeHeader>

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

      {/* For some reason using `type="submit"` on the button results in a lot of "An invalid form control with name='categories[0]'" errors. */}
      <Button
        type="button"
        onClick={formMethods.handleSubmit(onSubmit)}
        width="full"
        variant="solid"
        colorScheme="green"
      >
        Submit
      </Button>
    </Form>
  )
}

export default RecipeForm
