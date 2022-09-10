import { useEffect } from 'react'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  VStack,
} from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'
import { CreateRecipeInput } from 'types/graphql'

import {
  Label,
  TextField,
  useFieldArray,
  useFormContext,
} from '@redwoodjs/forms'

type Props = {
  ingredientIndex: number
}

const RecipeIngredientForm = ({ ingredientIndex }: Props) => {
  const { formState } = useFormContext<CreateRecipeInput>()
  const ingredientKey = `ingredientGroups.${ingredientIndex}`

  const { fields, append, remove } = useFieldArray({
    name: `ingredientGroups[${ingredientIndex}].ingredients`,
  })

  // Initialise the config with one item
  useEffect(() => {
    append('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addIngredient = () => append('')

  // Fixes a specific behaviour that results in fields being empty. However, there must be at least one item in the list.
  // When there are 2 items, and item 1 has a value 'anything' and item 2 is empty,
  // if you delete item 1 from the list, it deletes both fields as the second item is empty.
  // In this case, add a new empty item back into the list.
  if (fields.length === 0) {
    addIngredient()
  }

  return (
    <>
      <FormControl
        isInvalid={!!formState.errors.ingredientGroups?.[ingredientIndex].name}
        isDisabled={formState.isSubmitting}
      >
        <FormLabel as={Label} name={`${ingredientKey}.name`}>
          Sub Group Name
        </FormLabel>

        <Input
          as={TextField}
          name={`${ingredientKey}.name`}
          validation={{
            required: {
              value: true,
              message: 'Please enter a name',
            },
          }}
        />
      </FormControl>

      <FormControl>
        <FormLabel as={Label} name={`${ingredientKey}.ingredients`}>
          Ingredients List
        </FormLabel>

        <VStack gap={2} width="full">
          {fields.map((field, index) => (
            <HStack key={field.id} width="full">
              <Input
                as={TextField}
                name={`${ingredientKey}.ingredients.${index}`}
                aria-label="Ingredient item"
              />

              <IconButton
                aria-label="Delete ingredient"
                icon={<FaTrashAlt />}
                background="white"
                borderWidth="1px"
                borderColor="gray.200"
                borderStyle="solid"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              />
            </HStack>
          ))}
        </VStack>

        <Flex alignItems="center" justifyContent="center" width="full" mt={3}>
          <Button
            type="button"
            onClick={() => {
              addIngredient()
            }}
            variant="link"
            fontWeight={400}
          >
            + Add Ingredient
          </Button>
        </Flex>
      </FormControl>
    </>
  )
}

export default RecipeIngredientForm
