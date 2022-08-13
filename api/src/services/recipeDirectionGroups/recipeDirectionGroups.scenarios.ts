import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import { CreateRecipeDirectionGroupInput } from 'types/graphql'

import { RECIPE_CATEGORIES } from '../recipes/recipes'

interface FakeRecipeDirectionGroupsOptions {
  recipeId?: number
}

export function fakeRecipeDirectionGroup(
  options: FakeRecipeDirectionGroupsOptions
): Partial<CreateRecipeDirectionGroupInput> {
  const recipeId = options.recipeId ?? faker.datatype.number()

  return {
    directions: [
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
    ],
    name: faker.commerce.productName(),
    recipeId,
  }
}

export const standard = {
  user: {
    currentUser: (): Prisma.UserCreateArgs => ({
      data: {
        email: faker.unique(faker.internet.email),
        firstName: faker.name.firstName(),
        hashedPassword: faker.internet.password(),
        lastName: faker.name.lastName(),
        salt: faker.internet.password(),
      },
    }),
    anotherUser: (): Prisma.UserCreateArgs => ({
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
    myRecipe: (scenario): Prisma.RecipeCreateArgs => ({
      data: {
        categories: faker.helpers.arrayElements(
          RECIPE_CATEGORIES,
          faker.datatype.number({ min: 1, max: RECIPE_CATEGORIES.length })
        ),
        name: faker.animal.bird(),
        userId: scenario.user.currentUser.id,
      },
    }),
    anotherRecipe: (scenario): Prisma.RecipeCreateArgs => ({
      data: {
        categories: faker.helpers.arrayElements(
          RECIPE_CATEGORIES,
          faker.datatype.number({ min: 1, max: RECIPE_CATEGORIES.length })
        ),
        name: faker.animal.bird(),
        userId: scenario.user.anotherUser.id,
      },
    }),
  },
  recipeDirectionGroup: {
    fromMyRecipeOne: (scenario): Prisma.RecipeDirectionGroupCreateArgs => ({
      data: {
        directions: [
          faker.lorem.paragraph(),
          faker.lorem.paragraph(),
          faker.lorem.paragraph(),
        ],
        name: faker.commerce.productName(),
        recipeId: scenario.recipe.myRecipe.id,
      },
    }),
    fromMyRecipeTwo: (scenario): Prisma.RecipeDirectionGroupCreateArgs => ({
      data: {
        directions: [
          faker.lorem.paragraph(),
          faker.lorem.paragraph(),
          faker.lorem.paragraph(),
        ],
        name: faker.commerce.productName(),
        recipeId: scenario.recipe.myRecipe.id,
      },
    }),
    fromAnotherRecipeOne: (
      scenario
    ): Prisma.RecipeDirectionGroupCreateArgs => ({
      data: {
        directions: [
          faker.lorem.paragraph(),
          faker.lorem.paragraph(),
          faker.lorem.paragraph(),
        ],
        name: faker.commerce.productName(),
        recipeId: scenario.recipe.anotherRecipe.id,
      },
    }),
  },
}

export type StandardScenario = {
  user?: Record<string, Prisma.UserCreateArgs['data']>
  recipe?: Record<string, Prisma.RecipeCreateArgs['data']>
  recipeDirectionGroup: Record<
    string,
    Prisma.RecipeDirectionGroupCreateArgs['data']
  >
}
