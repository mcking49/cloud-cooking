import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import { CreateRecipeInput } from 'types/graphql'

import { RECIPE_CATEGORIES } from './recipes'

interface FakeRecipeOptions {
  userId?: number
}

export function fakeRecipe(options: FakeRecipeOptions = {}): CreateRecipeInput {
  const userId = options.userId ?? faker.datatype.number()

  return {
    categories: faker.helpers.arrayElements(
      RECIPE_CATEGORIES,
      faker.datatype.number({ min: 1, max: RECIPE_CATEGORIES.length })
    ),
    length: faker.datatype.number({ min: 10, max: 120 }),
    name: faker.animal.bird(),
    servings: faker.datatype.number({ min: 1, max: 12 }),
    userId,
  }
}

export const standard = defineScenario<Prisma.RecipeCreateArgs>({
  recipe: {
    one: {
      data: {
        categories: faker.helpers.arrayElements(
          RECIPE_CATEGORIES,
          faker.datatype.number({ min: 1, max: RECIPE_CATEGORIES.length })
        ),
        name: faker.animal.bird(),
        user: {
          create: {
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            hashedPassword: faker.internet.password(),
            lastName: faker.name.lastName(),
            salt: faker.internet.password(),
          },
        },
      },
    },
    two: {
      data: {
        categories: faker.helpers.arrayElements(
          RECIPE_CATEGORIES,
          faker.datatype.number({ min: 1, max: RECIPE_CATEGORIES.length })
        ),
        name: faker.animal.bird(),
        user: {
          create: {
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            hashedPassword: faker.internet.password(),
            lastName: faker.name.lastName(),
            salt: faker.internet.password(),
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
