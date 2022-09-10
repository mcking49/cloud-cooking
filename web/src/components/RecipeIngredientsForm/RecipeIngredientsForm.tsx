import { VStack } from '@chakra-ui/react'
import { CreateRecipeInput } from 'types/graphql'

import { useFieldArray, useFormContext } from '@redwoodjs/forms'

import RecipeIngredientForm from '../RecipeIngredientForm'

const RecipeIngredientsForm = () => {
  const { control } = useFormContext<CreateRecipeInput>()

  const { fields } = useFieldArray({
    control,
    name: 'ingredientGroups',
  })

  return (
    <VStack gap={6}>
      {fields.map((field, index) => (
        <RecipeIngredientForm key={field.id} ingredientIndex={index} />
      ))}
    </VStack>
  )
}

export default RecipeIngredientsForm
