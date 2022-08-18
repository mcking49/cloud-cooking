export const schema = gql`
  type RecipeIngredientGroup {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    ingredients: [String]!
    name: String!
    recipe: Recipe!
    recipeId: Int!
  }

  type Query {
    recipeIngredientGroups: [RecipeIngredientGroup!]! @requireAuth
  }

  input CreateRecipeIngredientGroupInput {
    ingredients: [String]!
    name: String!
    recipeId: Int!
  }

  input UpdateRecipeIngredientGroupInput {
    ingredients: [String]
    name: String
  }

  type Mutation {
    updateRecipeIngredientGroup(
      id: Int!
      input: UpdateRecipeIngredientGroupInput!
    ): RecipeIngredientGroup! @requireAuth
    deleteRecipeIngredientGroup(id: Int!): RecipeIngredientGroup! @requireAuth
  }
`
