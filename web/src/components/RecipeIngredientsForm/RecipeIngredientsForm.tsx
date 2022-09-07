import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import { CreateRecipeInput } from 'types/graphql'

import {
  Label,
  TextField,
  useFieldArray,
  useFormContext,
} from '@redwoodjs/forms'

const RecipeIngredientsForm = () => {
  const { control, formState } = useFormContext<CreateRecipeInput>()

  const { fields } = useFieldArray({
    control,
    name: 'ingredientGroups',
  })

  return (
    <VStack gap={6}>
      {fields.map((field, index) => (
        <FormControl
          key={field.id}
          isInvalid={!!formState.errors.ingredientGroups?.[index].name}
          isDisabled={formState.isSubmitting}
        >
          <FormLabel as={Label} name={`ingredientGroups.${index}.name`}>
            Sub Group Name
          </FormLabel>

          <Input
            as={TextField}
            name={`ingredientGroups.${index}.name`}
            validation={{
              required: {
                value: true,
                message: 'Please enter a name',
              },
            }}
          />
        </FormControl>
      ))}
    </VStack>
  )
}

export default RecipeIngredientsForm
