import {
  Box,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  useCheckboxGroup,
  VStack,
} from '@chakra-ui/react'
import { capitalize } from 'lodash/fp'
import type { CreateRecipeInput } from 'types/graphql'

import { Label, TextField, useFormContext } from '@redwoodjs/forms'

import { RECIPE_CATEGORIES } from 'src/lib/constants'

import CategoryOption from '../CategoryOption'

const RecipeDetailsForm = () => {
  const { formState } = useFormContext<CreateRecipeInput>()

  const checkboxGroup = useCheckboxGroup({
    isDisabled: formState.isSubmitting,
    defaultValue: [],
  })

  return (
    <VStack gap={6}>
      <FormControl
        isInvalid={!!formState.errors.name}
        isDisabled={formState.isSubmitting}
      >
        <FormLabel as={Label} name="name">
          Name
        </FormLabel>

        <Input
          as={TextField}
          name="name"
          validation={{
            required: {
              value: true,
              message: 'Please enter a name',
            },
          }}
        />
      </FormControl>

      <Box w="full">
        <FormLabel as={Label} name="categories">
          Category
        </FormLabel>

        <SimpleGrid columns={3} gap={2}>
          {RECIPE_CATEGORIES.map((category, index) => (
            <CategoryOption
              key={category}
              checkboxProps={checkboxGroup.getCheckboxProps({
                value: category,
              })}
              isInvalid={!!formState.errors.categories}
              label={capitalize(category)}
              name={`categories[${index}]`}
            />
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  )
}

export default RecipeDetailsForm
