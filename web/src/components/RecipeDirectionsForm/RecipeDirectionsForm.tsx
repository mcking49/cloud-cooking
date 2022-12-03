import { Button, VStack } from '@chakra-ui/react'
import { CreateRecipeInput } from 'types/graphql'

import { useFieldArray, useFormContext } from '@redwoodjs/forms'

import RecipeDirectionForm from '../RecipeDirectionForm/RecipeDirectionForm'

const RecipeDirectionsForm = () => {
  const { control } = useFormContext<CreateRecipeInput>()

  const { fields, append } = useFieldArray({
    control,
    name: 'directionGroups',
  })

  const addSubGroup = () => append({ directions: [''], name: '' })

  return (
    <VStack gap={6}>
      {fields.map((field, index) => (
        <RecipeDirectionForm key={field.id} directionIndex={index} />
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

export default RecipeDirectionsForm
