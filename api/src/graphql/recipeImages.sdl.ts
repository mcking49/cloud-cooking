export const schema = gql`
  type RecipeImage {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    recipe: Recipe!
    recipeId: Int!
    url: String!
  }

  type Query {
    recipeImage(id: Int!): RecipeImage @requireAuth
  }

  input CreateRecipeImageInput {
    recipeId: Int
    url: String!
  }

  input UpdateRecipeImageInput {
    url: String
  }

  type Mutation {
    createRecipeImage(input: CreateRecipeImageInput!): RecipeImage! @requireAuth
    updateRecipeImage(id: Int!, input: UpdateRecipeImageInput!): RecipeImage!
      @requireAuth
    deleteRecipeImage(id: Int!): RecipeImage! @requireAuth
  }
`