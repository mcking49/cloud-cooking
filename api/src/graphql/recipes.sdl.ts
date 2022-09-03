export const schema = gql`
  type Recipe {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    categories: [RecipeCategory!]!
    directionGroups: [RecipeDirectionGroup!]!
    ingredientGroups: [RecipeIngredientGroup!]!
    length: Int
    name: String!
    recipeImages: [RecipeImage]!
    servings: Int
    sourceUrl: String
    user: User!
    userId: Int!
  }

  enum RecipeCategory {
    BREAKFAST
    DESSERT
    DINNER
    LUNCH
    OTHER
    SNACK
  }

  type Query {
    recipes: [Recipe!]! @requireAuth
    recipe(id: Int!): Recipe @requireAuth
  }

  input CreateRecipeInput {
    categories: [RecipeCategory]!
    length: Int
    name: String!
    servings: Int
    sourceUrl: String
    userId: Int
    recipeImageIds: [Int]
    directionGroups: [CreateRecipeDirectionGroupInput!]!
    ingredientGroups: [CreateRecipeIngredientGroupInput!]!
  }

  input UpdateRecipeInput {
    categories: [RecipeCategory]
    length: Int
    name: String
    servings: Int
    sourceUrl: String
  }

  type Mutation {
    createRecipe(input: CreateRecipeInput!): Recipe! @requireAuth
    updateRecipe(id: Int!, input: UpdateRecipeInput!): Recipe! @requireAuth
    deleteRecipe(id: Int!): Recipe! @requireAuth
  }
`
