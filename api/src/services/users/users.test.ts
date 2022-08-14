import { faker } from '@faker-js/faker'

import { ServiceValidationError } from '@redwoodjs/api'
import { AuthenticationError } from '@redwoodjs/graphql-server'

import { user, updateUser } from './users'
import type { StandardScenario } from './users.scenarios'

describe('users', () => {
  describe('findUnique', () => {
    scenario('returns the currentUser', async (scenario: StandardScenario) => {
      const currentUser = scenario.user.me
      mockCurrentUser({
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      })

      const result = await user()

      expect(result).toEqual(currentUser)
    })

    scenario('validates user is authenticated', async () => {
      mockCurrentUser(null)

      const query = user()

      await expect(query).rejects.toThrow(AuthenticationError)
      await expect(query).rejects.toThrowError(
        "You don't have permission to do that"
      )
    })
  })

  describe('update', () => {
    scenario('updates a user', async (scenario: StandardScenario) => {
      const currentUser = scenario.user.me
      mockCurrentUser({
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      })

      const firstName = faker.name.firstName()

      const result = await updateUser({
        id: currentUser.id,
        input: { firstName },
      })

      expect(result.firstName).toEqual(firstName)
    })

    scenario(
      'validates id is for currentUser',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        })

        const firstName = faker.name.firstName()
        const query = updateUser({
          id: scenario.user.notMe.id,
          input: { firstName },
        })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )

    scenario(
      'validates firstName input',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        })

        const queryEmpty = updateUser({
          id: currentUser.id,
          input: { firstName: '' },
        })

        const queryNull = updateUser({
          id: currentUser.id,
          input: { firstName: null },
        })

        await expect(queryEmpty).rejects.toThrow(ServiceValidationError)
        await expect(queryEmpty).rejects.toThrowError(
          'First Name must be present'
        )
        await expect(queryNull).rejects.toThrow(ServiceValidationError)
        await expect(queryNull).rejects.toThrowError(
          'First Name must be present'
        )
      }
    )

    scenario('validates lastName input', async (scenario: StandardScenario) => {
      const currentUser = scenario.user.me
      mockCurrentUser({
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      })

      const queryEmpty = updateUser({
        id: currentUser.id,
        input: { lastName: '' },
      })

      const queryNull = updateUser({
        id: currentUser.id,
        input: { lastName: null },
      })

      await expect(queryEmpty).rejects.toThrow(ServiceValidationError)
      await expect(queryEmpty).rejects.toThrowError('Last Name must be present')
      await expect(queryNull).rejects.toThrow(ServiceValidationError)
      await expect(queryNull).rejects.toThrowError('Last Name must be present')
    })

    scenario(
      'validates user is authenticated',
      async (scenario: StandardScenario) => {
        mockCurrentUser(null)

        const query = updateUser({
          id: scenario.user.me.id,
          input: {
            firstName: faker.name.firstName(),
          },
        })

        await expect(query).rejects.toThrow(AuthenticationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )
  })
})
