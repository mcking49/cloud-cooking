import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import { CreateRecipeImageInput } from 'types/graphql'

import { RECIPE_CATEGORIES } from '../recipes/recipes'

export function fakeRecipeImage(): CreateRecipeImageInput {
  return {
    url: faker.internet.url(),
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
    myRecipeTwo: (scenario: StandardScenario): Prisma.RecipeCreateArgs => ({
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
  recipeImage: {
    fromMyRecipeOne: (
      scenario: StandardScenario
    ): Prisma.RecipeImageCreateArgs => ({
      data: {
        url: faker.internet.url(),
        recipeId: scenario.recipe.myRecipeOne.id,
      },
    }),
    fromNotMyRecipeOne: (
      scenario: StandardScenario
    ): Prisma.RecipeImageCreateArgs => ({
      data: {
        url: faker.internet.url(),
        recipeId: scenario.recipe.notMyRecipeOne.id,
      },
    }),
    unclaimed: (): Prisma.RecipeImageCreateArgs => ({
      data: {
        url: faker.internet.url(),
      },
    }),
  },
}

export type StandardScenario = {
  user?: Record<string, Prisma.UserCreateArgs['data']>
  recipe?: Record<string, Prisma.RecipeCreateArgs['data']>
  recipeImage: Record<string, Prisma.RecipeImageCreateArgs['data']>
}
