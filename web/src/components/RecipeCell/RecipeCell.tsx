import { useState } from 'react'

import {
  Heading,
  HStack,
  Icon,
  ListItem,
  Tag,
  UnorderedList,
  VStack,
} from '@chakra-ui/react'
import { capitalize } from 'lodash/fp'
import { AiFillClockCircle } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { GiForkKnifeSpoon } from 'react-icons/gi'
import type { FindRecipeQuery, FindRecipeQueryVariables } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import { SideMenuHeader } from 'src/layouts/SideMenuLayout'

type RecipeTab = 'INGREDIENTS' | 'DIRECTIONS'

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
  // TODO: use _setActiveTab
  const [activeTab, _setActiveTab] = useState<RecipeTab>('INGREDIENTS')

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

      <VStack alignItems="flex-start" w="full" minHeight="full" spacing={6}>
        <HStack justifyContent="space-between" w="full">
          <Heading as="h1" fontWeight={400} fontSize="16px" lineHeight="1.25em">
            Ingredients
          </Heading>

          <div>buttons</div>
        </HStack>

        {activeTab === 'INGREDIENTS' ? (
          <VStack h="full" w="full" spacing={4}>
            {recipe.ingredientGroups.map((ingredientGroup) => (
              <VStack
                key={ingredientGroup.id}
                w="full"
                background="white"
                borderRadius="6px"
                paddingY={3}
                paddingX={4}
                alignItems="flex-start"
                spacing={3}
              >
                <Heading
                  as="h2"
                  color="green.400"
                  fontFamily="Open Sans"
                  fontWeight={600}
                  fontSize="10px"
                  lineHeight="1.4em"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                >
                  {ingredientGroup.name}
                </Heading>

                {ingredientGroup.ingredients.length && (
                  <UnorderedList>
                    {ingredientGroup.ingredients.map((ingredient, index) => (
                      <ListItem
                        key={`${index}_${ingredient}`}
                        fontFamily=" PT Sans"
                        fontWeight={400}
                        lineHeight="1.25em"
                        fontSize="16px"
                        ml={6}
                      >
                        {ingredient}
                      </ListItem>
                    ))}
                  </UnorderedList>
                )}
              </VStack>
            ))}
          </VStack>
        ) : (
          <div>directions tab</div>
        )}
      </VStack>
      <div>{JSON.stringify(recipe)}</div>
    </>
  )
}
