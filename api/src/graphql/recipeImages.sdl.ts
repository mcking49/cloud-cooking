export const schema = gql`
  type RecipeImage {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    recipe: Recipe
    recipeId: Int
    thumbnail: String!
    url: String!
  }

  type Query {
    recipeImage(id: Int!): RecipeImage @requireAuth
  }

  input CreateRecipeImageInput {
    url: String!
  }

  input UpdateRecipeImageInput {
    recipeId: Int!
  }

  type Mutation {
    createRecipeImage(input: CreateRecipeImageInput!): RecipeImage! @requireAuth
    updateRecipeImage(id: Int!, input: UpdateRecipeImageInput!): RecipeImage!
      @requireAuth
    deleteRecipeImage(id: Int!): RecipeImage! @requireAuth
  }
`
