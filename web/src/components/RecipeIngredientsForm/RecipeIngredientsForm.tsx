import { Button, VStack } from '@chakra-ui/react'
import { CreateRecipeInput } from 'types/graphql'

import { useFieldArray, useFormContext } from '@redwoodjs/forms'

import RecipeIngredientForm from '../RecipeIngredientForm'

const RecipeIngredientsForm = () => {
  const { control } = useFormContext<CreateRecipeInput>()

  const { fields, append } = useFieldArray({
    control,
    name: 'ingredientGroups',
  })

  const addSubGroup = () => append({ ingredients: [''], name: '' })

  return (
    <VStack gap={6}>
      {fields.map((field, index) => (
        <RecipeIngredientForm key={field.id} ingredientIndex={index} />
      ))}

      <Button
        variant="outline"
        color="green.400"
        borderColor="green.400"
        w="full"
        type="button"
        onClick={addSubGroup}
      >
        + Add Sub Group
      </Button>
    </VStack>
  )
}

export default RecipeIngredientsForm
