import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'
import { User } from 'types/graphql'

type FakeUser = Omit<
  User,
  'createdAt' | 'id' | 'recipes' | 'updatedAt' | 'hashedPassword' | 'salt'
>

export function fakeUser(): FakeUser {
  return {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  }
}

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        hashedPassword: faker.internet.password(),
        lastName: faker.name.lastName(),
        salt: faker.internet.password(),
      },
    },
    two: {
      data: {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        hashedPassword: faker.internet.password(),
        lastName: faker.name.lastName(),
        salt: faker.internet.password(),
      },
    },
  },
})

export type StandardScenario = typeof standard
