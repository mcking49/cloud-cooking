import { useState } from 'react'

import { FormControl, FormLabel, HStack, Image, Text } from '@chakra-ui/react'
import type { CreateRecipeInput, RecipeImage } from 'types/graphql'

import { Label, useFormContext } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import FilePicker from '../FilePicker/FilePicker'

const CREATE_RECIPE_IMAGE = gql`
  mutation CreateRecipeImage($input: CreateRecipeImageInput!) {
    createRecipeImage(input: $input) {
      id
      thumbnail
    }
  }
`

const ImageFormField = () => {
  const [createRecipeImage] = useMutation(CREATE_RECIPE_IMAGE)
  const { formState, setValue } = useFormContext<CreateRecipeInput>()
  const [currImage, setCurrImage] = useState<RecipeImage>(null)

  const onUploadImage = async (result) => {
    const imageUrl: string = result?.filesUploaded?.[0]?.url

    if (imageUrl) {
      const response = await createRecipeImage({
        variables: {
          input: {
            url: imageUrl,
          },
        },
      })

      const recipeImage: RecipeImage = response.data?.createRecipeImage

      if (recipeImage) {
        setValue('recipeImageIds', [recipeImage.id])
        setCurrImage(response.data.createRecipeImage)
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

      {currImage && <Image src={currImage.thumbnail} alt="Image thumbnail" />}

      <FilePicker
        accept="image/*"
        onSuccess={onUploadImage}
        text="Add Photo"
        mode={currImage ? 'replace' : 'first_pick'}
      />
    </FormControl>
  )
}

export default ImageFormField
