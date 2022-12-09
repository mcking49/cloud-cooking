import { Heading, HStack, Icon, Tag, VStack } from '@chakra-ui/react'
import { capitalize } from 'lodash/fp'
import { AiFillClockCircle } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { GiForkKnifeSpoon } from 'react-icons/gi'
import type { FindRecipeQuery, FindRecipeQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { SideMenuHeader } from 'src/layouts/SideMenuLayout'

export const QUERY = gql`
  query FindRecipeQuery($id: Int!) {
    recipe: recipe(id: $id) {
      id
      categories
      directionGroups {
        id
        directions
        name
      }
      ingredientGroups {
        id
        ingredients
        name
      }
      length
      name
      recipeImages {
        id
        thumbnail
        url
      }
      servings
      sourceUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindRecipeQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  recipe,
}: CellSuccessProps<FindRecipeQuery, FindRecipeQueryVariables>) => {
  console.log('cell success', recipe)

  return (
    <>
      <SideMenuHeader>
        <VStack
          justifyContent="flex-end"
          w="full"
          h="full"
          alignItems="flex-start"
          spacing={2}
        >
          <Heading as="h1" fontWeight={400} lineHeight="1.2em" mt={4}>
            {recipe.name}
          </Heading>

          <HStack spacing={2}>
            {recipe.categories.map((category) => (
              <Tag
                key={category}
                variant="solid"
                backgroundColor="#F3D191"
                color="blue.800"
                borderRadius="4px"
                fontSize="8px"
                lineHeight="1.2em"
                padding="6px 8px"
                minHeight={0}
                minWidth={0}
              >
                <Icon as={GiForkKnifeSpoon} mr="6px" />
                {capitalize(category)}
              </Tag>
            ))}

            {recipe.length && (
              <Tag
                variant="solid"
                backgroundColor="#F3D191"
                color="blue.800"
                borderRadius="4px"
                fontSize="8px"
                lineHeight="1.2em"
                padding="6px 8px"
                minHeight={0}
                minWidth={0}
              >
                <Icon as={AiFillClockCircle} mr="6px" />
                {recipe.length} mins
              </Tag>
            )}

            {recipe.servings && (
              <Tag
                variant="solid"
                backgroundColor="#F3D191"
                color="blue.800"
                borderRadius="4px"
                fontSize="8px"
                lineHeight="1.2em"
                padding="6px 8px"
                minHeight={0}
                minWidth={0}
              >
                <Icon as={FaUser} mr="6px" />
                {recipe.servings} people
              </Tag>
            )}
          </HStack>
        </VStack>
      </SideMenuHeader>
      <div>{JSON.stringify(recipe)}</div>
    </>
  )
}
