import { FormControl, FormLabel, HStack, Text } from '@chakra-ui/react'
import type { CreateRecipeInput } from 'types/graphql'

import { Label, useFormContext } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import FilePicker from '../FilePicker/FilePicker'

const CREATE_RECIPE_IMAGE = gql`
  mutation CreateRecipeImage($input: CreateRecipeImageInput!) {
    createRecipeImage(input: $input) {
      id
    }
  }
`

const ImageFormField = () => {
  const [createRecipeImage] = useMutation(CREATE_RECIPE_IMAGE)
  const { formState, setValue } = useFormContext<CreateRecipeInput>()

  const onUploadImage = async (result) => {
    const imageUrl: string = result?.filesUploaded?.[0]?.url

    if (imageUrl) {
      const record = await createRecipeImage({
        variables: {
          input: {
            url: imageUrl,
          },
        },
      })

      const id = record.data?.createRecipeImage.id

      if (id) {
        setValue('recipeImageIds', [id])
      }
    }
  }
  return (
    <FormControl
      isInvalid={!!formState.errors.recipeImageIds}
      isDisabled={formState.isSubmitting}
    >
      <FormLabel as={Label} name="recipeImageIds">
        <HStack>
          <Text>Photo</Text>
          <Text variant="caption" color="gray.400">
            (optional)
          </Text>
        </HStack>
      </FormLabel>

      <FilePicker accept="image/*" onSuccess={onUploadImage} text="Add Photo" />
    </FormControl>
  )
}

export default ImageFormField
