import type { RecipesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

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
        url
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
    <ul>
      {recipes.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
