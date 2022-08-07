import { faker } from '@faker-js/faker'

import { CurrentUser } from '@redwoodjs/auth'

export const standard = (): CurrentUser => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  return {
    email: faker.internet.email(firstName, lastName),
    firstName,
    id: faker.datatype.number(),
    lastName,
  }
}
