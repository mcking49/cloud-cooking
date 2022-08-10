import { faker } from '@faker-js/faker'

import { user, updateUser } from './users'
import type { StandardScenario } from './users.scenarios'

describe('users', () => {
  scenario('returns a single user', async (scenario: StandardScenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('updates a user', async (scenario: StandardScenario) => {
    mockCurrentUser({
      id: scenario.user.one.id,
      email: scenario.user.one.email,
      firstName: scenario.user.one.firstName,
      lastName: scenario.user.one.lastName,
    })

    const firstName = faker.name.firstName()

    const original = await user({ id: scenario.user.one.id })
    const result = await updateUser({
      id: original.id,
      input: { firstName },
    })

    expect(result.firstName).toEqual(firstName)
  })

  scenario("can't update another user", async (scenario: StandardScenario) => {
    mockCurrentUser({
      id: scenario.user.one.id,
      email: scenario.user.one.email,
      firstName: scenario.user.one.firstName,
      lastName: scenario.user.one.lastName,
    })

    const firstName = faker.name.firstName()
    const original = await user({ id: scenario.user.two.id })

    expect(
      async () => await updateUser({ id: original.id, input: { firstName } })
    ).rejects.toThrowError("You don't have permission to do that")
  })
})
