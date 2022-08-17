import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import { CreateRecipeInput } from 'types/graphql'

import { RECIPE_CATEGORIES } from './recipes'

interface FakeRecipeOptions {
  userId?: number
  withLength?: boolean
  withServings?: boolean
  withSourceUrl?: boolean
}

export function fakeRecipe(options: FakeRecipeOptions = {}): CreateRecipeInput {
  const userId = options.userId ?? faker.datatype.number()

  const result: CreateRecipeInput = {
    categories: faker.helpers.arrayElements(
      RECIPE_CATEGORIES,
      faker.datatype.number({ min: 1, max: RECIPE_CATEGORIES.length })
    ),
    name: faker.animal.bird(),
    userId,
  }

  if (options.withLength) {
    result.length = faker.datatype.number({ min: 10, max: 120 })
  }

  if (options.withServings) {
    result.servings = faker.datatype.number({ min: 1, max: 12 })
  }

  if (options.withSourceUrl) {
    result.sourceUrl = faker.internet.url()
  }

  return result
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
}

export type StandardScenario = {
  user?: Record<string, Prisma.UserCreateArgs['data']>
  recipe: Record<string, Prisma.RecipeCreateArgs['data']>
}
