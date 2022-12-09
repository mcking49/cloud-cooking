import type { FindRecipeQuery, FindRecipeQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

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

  return <div>{JSON.stringify(recipe)}</div>
}
