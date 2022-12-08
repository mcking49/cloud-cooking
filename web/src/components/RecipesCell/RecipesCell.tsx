import {
  Heading,
  HStack,
  List,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import type { RecipesQuery } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import RecipeCard from '../RecipeCard/RecipeCard'

export const QUERY = gql`
  query RecipesQuery {
    recipes {
      id
      categories
      length
      name
      recipeImages {
        id
        thumbnail
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ recipes }: CellSuccessProps<RecipesQuery>) => {
  console.log(recipes)

  return (
    <VStack width="full" alignItems="flex-start" spacing={6}>
      <HStack>
        <Heading as="h2" fontWeight="normal" fontSize="16px" lineHeight="1.2em">
          All Recipes
        </Heading>

        <Text variant="hint" fontSize="10px" lineHeight="1.2em">
          ({recipes.length} recipes)
        </Text>
      </HStack>

      <SimpleGrid columns={2} as={List} width="full" gap={3}>
        {recipes.map((recipe) => (
          <ListItem key={recipe.id}>
            <RecipeCard
              imageUrl={recipe.recipeImages[0]?.thumbnail}
              name={recipe.name}
              categories={recipe.categories}
              length={recipe.length}
            />
          </ListItem>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
