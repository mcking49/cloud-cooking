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
import type { CreateRecipeInput } from 'types/graphql'

import {
  Label,
  TextField,
  useFieldArray,
  useFormContext,
} from '@redwoodjs/forms'

type Props = {
  directionIndex: number
}

const RecipeDirectionForm = ({ directionIndex }: Props) => {
  const { formState } = useFormContext<CreateRecipeInput>()
  const directionKey = `directionGroups.${directionIndex}`

  const { fields, append, remove } = useFieldArray({
    name: `directionGroups[${directionIndex}].directions`,
  })

  // Initialise the config with one item
  useEffect(() => {
    append('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addDirection = () => append('')

  // Fixes a specific behaviour that results in fields being empty. However, there must be at least one item in the list.
  // When there are 2 items, and item 1 has a value 'anything' and item 2 is empty,
  // if you delete item 1 from the list, it deletes both fields as the second item is empty.
  // In this case, add a new empty item back into the list.
  if (fields.length === 0) {
    addDirection()
  }

  return (
    <>
      <FormControl
        isInvalid={!!formState.errors.directionGroups?.[directionIndex]?.name}
        isDisabled={formState.isSubmitting}
      >
        <FormLabel as={Label} name={`${directionKey}.name`}>
          Sub Group Name
        </FormLabel>

        <Input
          as={TextField}
          name={`${directionKey}.name`}
          validation={{
            required: {
              value: true,
              message: 'Please enter a name',
            },
          }}
        />
      </FormControl>

      <FormControl>
        <FormLabel as={Label} name={`${directionKey}.directions`}>
          Method
        </FormLabel>

        <VStack gap={2} width="full">
          {fields.map((field, index) => (
            <HStack key={field.id} width="full">
              <Input
                as={TextField}
                name={`${directionKey}.directions.${index}`}
                aria-label="Method item"
              />

              <IconButton
                aria-label="Delete method"
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
              addDirection()
            }}
            variant="link"
            fontWeight={400}
          >
            + Add Step
          </Button>
        </Flex>
      </FormControl>
    </>
  )
}

export default RecipeDirectionForm
