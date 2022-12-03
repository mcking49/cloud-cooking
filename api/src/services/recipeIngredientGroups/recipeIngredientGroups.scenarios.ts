import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import { CreateRecipeIngredientGroupInput } from 'types/graphql'

import { RECIPE_CATEGORIES } from '../recipes/recipes'

interface FakeRecipeIngredientGroupsOptions {
  recipeId?: number
}

export function fakeRecipeIngredientGroup(
  options: FakeRecipeIngredientGroupsOptions = {}
): CreateRecipeIngredientGroupInput {
  const recipeId = options.recipeId ?? faker.datatype.number()

  return {
    ingredients: [
      faker.animal.fish(),
      faker.animal.fish(),
      faker.animal.fish(),
    ],
    name: faker.commerce.productName(),
    recipeId,
  }
}

export const standard = {
  user: {
    me: (): Prisma.UserCreateArgs => ({
      data: {
        email: faker.unique(faker.internet.email),
        firstName: faker.name.firstName(),
        hashedPassword: faker.internet.password(),
        lastName: faker.name.lastName(),
        salt: faker.internet.password(),
      },
    }),
    notMe: (): Prisma.UserCreateArgs => ({
      data: {
        email: faker.unique(faker.internet.email),
        firstName: faker.name.firstName(),
        hashedPassword: faker.internet.password(),
        lastName: faker.name.lastName(),
        salt: faker.internet.password(),
      },
    }),
  },
  recipe: {
    myRecipeOne: (scenario: StandardScenario): Prisma.RecipeCreateArgs => ({
      data: {
        categories: faker.helpers.arrayElements(
          RECIPE_CATEGORIES,
          faker.datatype.number({ min: 1, max: RECIPE_CATEGORIES.length })
        ),
        name: faker.animal.bird(),
        userId: scenario.user.me.id,
      },
    }),
    notMyRecipeOne: (scenario: StandardScenario): Prisma.RecipeCreateArgs => ({
      data: {
        categories: faker.helpers.arrayElements(
          RECIPE_CATEGORIES,
          faker.datatype.number({ min: 1, max: RECIPE_CATEGORIES.length })
        ),
        name: faker.animal.bird(),
        userId: scenario.user.notMe.id,
      },
    }),
  },
  recipeIngredientGroup: {
    fromMyRecipeOne: (
      scenario: StandardScenario
    ): Prisma.RecipeIngredientGroupCreateArgs => ({
      data: {
        ingredients: [
          faker.animal.fish(),
          faker.animal.fish(),
          faker.animal.fish(),
        ],
        name: faker.commerce.productName(),
        recipeId: scenario.recipe.myRecipeOne.id,
      },
    }),
    fromMyRecipeTwo: (
      scenario: StandardScenario
    ): Prisma.RecipeIngredientGroupCreateArgs => ({
      data: {
        ingredients: [
          faker.animal.fish(),
          faker.animal.fish(),
          faker.animal.fish(),
        ],
        name: faker.commerce.productName(),
        recipeId: scenario.recipe.myRecipeOne.id,
      },
    }),
    fromNotMyRecipeOne: (
      scenario: StandardScenario
    ): Prisma.RecipeIngredientGroupCreateArgs => ({
      data: {
        ingredients: [
          faker.animal.fish(),
          faker.animal.fish(),
          faker.animal.fish(),
        ],
        name: faker.commerce.productName(),
        recipeId: scenario.recipe.notMyRecipeOne.id,
      },
    }),
  },
}

export type StandardScenario = {
  user?: Record<string, Prisma.UserCreateArgs['data']>
  recipe?: Record<string, Prisma.RecipeCreateArgs['data']>
  recipeIngredientGroup: Record<
    string,
    Prisma.RecipeIngredientGroupCreateArgs['data']
  >
}
