import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  SimpleGrid,
  Text,
  useCheckboxGroup,
  VStack,
} from '@chakra-ui/react'
import { capitalize } from 'lodash/fp'
import type { CreateRecipeInput } from 'types/graphql'

import { Label, NumberField, TextField, useFormContext } from '@redwoodjs/forms'

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

      <FormControl
        isInvalid={!!formState.errors.length}
        isDisabled={formState.isSubmitting}
      >
        <FormLabel as={Label} name="length">
          <HStack>
            <Text>Length</Text>
            <Text variant="caption" color="gray.400">
              (optional)
            </Text>
          </HStack>
        </FormLabel>

        <HStack>
          <Input as={NumberField} name="length" />
          <Text>mins</Text>
        </HStack>
      </FormControl>

      <FormControl
        isInvalid={!!formState.errors.servings}
        isDisabled={formState.isSubmitting}
      >
        <FormLabel as={Label} name="servings">
          <HStack>
            <Text>Servings</Text>
            <Text variant="caption" color="gray.400">
              (optional)
            </Text>
          </HStack>
        </FormLabel>

        <HStack>
          <Input as={NumberField} name="servings" />
          <Text>people</Text>
        </HStack>
      </FormControl>

      <FormControl
        isInvalid={!!formState.errors.recipeImages}
        isDisabled={formState.isSubmitting}
      >
        <FormLabel as={Label} name="recipeImages">
          <HStack>
            <Text>Photo</Text>
            <Text variant="caption" color="gray.400">
              (optional)
            </Text>
          </HStack>
        </FormLabel>

        {/* TODO: select and upload photo */}
      </FormControl>
    </VStack>
  )
}

export default RecipeDetailsForm
