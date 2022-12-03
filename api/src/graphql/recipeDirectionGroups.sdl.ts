export const schema = gql`
  type RecipeDirectionGroup {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    directions: [String]!
    name: String!
    recipe: Recipe!
    recipeId: Int!
  }

  type Query {
    recipeDirectionGroups: [RecipeDirectionGroup!]! @requireAuth
  }

  input CreateRecipeDirectionGroupInput {
    directions: [String]!
    name: String!
    recipeId: Int
  }

  input UpdateRecipeDirectionGroupInput {
    directions: [String]
    name: String
  }

  type Mutation {
    updateRecipeDirectionGroup(
      id: Int!
      input: UpdateRecipeDirectionGroupInput!
    ): RecipeDirectionGroup! @requireAuth
    deleteRecipeDirectionGroup(id: Int!): RecipeDirectionGroup! @requireAuth
  }
`
