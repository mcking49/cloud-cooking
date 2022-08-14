import { faker } from '@faker-js/faker'

import { ServiceValidationError } from '@redwoodjs/api'
import { AuthenticationError } from '@redwoodjs/graphql-server'

import {
  deleteRecipeDirectionGroup,
  recipeDirectionGroup,
  recipeDirectionGroups,
  updateRecipeDirectionGroup,
} from './recipeDirectionGroups'
import type { StandardScenario } from './recipeDirectionGroups.scenarios'

describe('recipeDirectionGroups', () => {
  describe('findMany', () => {
    scenario(
      'returns all recipeDirectionGroups for a given recipe owned by the currentUser',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        })

        const result = await recipeDirectionGroups(
          scenario.recipe.myRecipeOne.id
        )

        const totalRecipes = Object.keys(scenario.recipeDirectionGroup).length

        const totalMyRecipes = Object.keys(
          scenario.recipeDirectionGroup
        ).filter((val) => val.includes('fromMyRecipe')).length

        const totalOtherRecipes = Object.keys(
          scenario.recipeDirectionGroup
        ).filter((val) => !val.includes('fromMyRecipe')).length

        expect(result.length).toEqual(totalMyRecipes)
        expect(totalRecipes).toEqual(result.length + totalOtherRecipes)
      }
    )

    scenario(
      'returns nothing when recipe belongs to another user',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        })

        const result = await recipeDirectionGroups(
          scenario.recipe.notMyRecipeOne.id
        )

        expect(result.length).toEqual(0)
      }
    )

    scenario(
      'validates user is authenticated',
      async (scenario: StandardScenario) => {
        mockCurrentUser(null)
        const query = recipeDirectionGroups(scenario.recipe.myRecipeOne.id)

        await expect(query).rejects.toThrow(AuthenticationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )
  })

  describe('findUnique', () => {
    scenario('returns a single recipe', async (scenario: StandardScenario) => {
      const currentUser = scenario.user.me
      mockCurrentUser({
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      })

      const myRecipeDirectionGroup =
        scenario.recipeDirectionGroup.fromMyRecipeOne

      const result = await recipeDirectionGroup({
        id: myRecipeDirectionGroup.id,
      })

      expect(result).toEqual(myRecipeDirectionGroup)
    })

    scenario(
      'returns null if item cannot be found',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        })

        const takenIds = Object.keys(scenario.recipeDirectionGroup).map(
          (key) => scenario.recipeDirectionGroup[key].id
        )
        const nonExistentId = takenIds.reduce((total, val) => total + val, 0)

        const result = await recipeDirectionGroup({ id: nonExistentId })

        expect(result).toEqual(null)
      }
    )

    scenario(
      "returns null when recipe doesn't belong to currentUser",
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        })

        const notMyRecipeDirectionGroup =
          scenario.recipeDirectionGroup.fromNotMyRecipeOne

        const result = await recipeDirectionGroup({
          id: notMyRecipeDirectionGroup.id,
        })
        expect(result).toEqual(null)
      }
    )

    scenario(
      'validates user is authenticated',
      async (scenario: StandardScenario) => {
        mockCurrentUser(null)

        const query = recipeDirectionGroup({
          id: scenario.recipeDirectionGroup.fromMyRecipeOne.id,
        })

        await expect(query).rejects.toThrow(AuthenticationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )
  })

  describe('update', () => {
    scenario(
      'updates a recipeDirectionGroup when the recipe belongs to the current user',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        })

        const original = await recipeDirectionGroup({
          id: scenario.recipeDirectionGroup.fromMyRecipeOne.id,
        })

        const newName = faker.commerce.productName()

        const result = await updateRecipeDirectionGroup({
          id: original.id,
          input: { name: newName },
        })
        expect(result.name).toEqual(newName)
      }
    )

    scenario(
      'validates user owns the recipe',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        })

        const newName = faker.commerce.productName()

        const query = updateRecipeDirectionGroup({
          id: scenario.recipeDirectionGroup.fromNotMyRecipeOne.id,
          input: { name: newName },
        })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )

    scenario(
      'validates user is authenticated',
      async (scenario: StandardScenario) => {
        mockCurrentUser(null)

        const newName = faker.commerce.productName()

        const query = updateRecipeDirectionGroup({
          id: scenario.recipeDirectionGroup.fromMyRecipeOne.id,
          input: { name: newName },
        })

        await expect(query).rejects.toThrow(AuthenticationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )

    scenario('validates directions', async (scenario: StandardScenario) => {
      const currentUser = scenario.user.me
      mockCurrentUser({
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      })

      const original = scenario.recipeDirectionGroup.fromMyRecipeOne

      const queryEmpty = updateRecipeDirectionGroup({
        id: original.id,
        input: {
          directions: [],
        },
      })

      const queryNull = updateRecipeDirectionGroup({
        id: original.id,
        input: {
          directions: null,
        },
      })

      await expect(queryEmpty).rejects.toThrow(ServiceValidationError)
      await expect(queryEmpty).rejects.toThrowError(
        'At least 1 direction must be present'
      )
      await expect(queryNull).rejects.toThrow(ServiceValidationError)
      await expect(queryNull).rejects.toThrowError('Directions must be present')
    })

    scenario('validates name', async (scenario: StandardScenario) => {
      const currentUser = scenario.user.me
      mockCurrentUser({
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      })

      const original = scenario.recipeDirectionGroup.fromMyRecipeOne

      const queryEmpty = updateRecipeDirectionGroup({
        id: original.id,
        input: {
          name: '',
        },
      })

      const queryNull = updateRecipeDirectionGroup({
        id: original.id,
        input: {
          name: null,
        },
      })

      await expect(queryEmpty).rejects.toThrow(ServiceValidationError)
      await expect(queryEmpty).rejects.toThrowError('Name must be present')
      await expect(queryNull).rejects.toThrow(ServiceValidationError)
      await expect(queryNull).rejects.toThrowError('Name must be present')
    })
  })

  describe('delete', () => {
    scenario(
      'deletes a recipeDirectionGroup when the recipe belongs to the current user',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        })

        const original = await deleteRecipeDirectionGroup({
          id: scenario.recipeDirectionGroup.fromMyRecipeOne.id,
        })

        const result = await recipeDirectionGroup({
          id: original.id,
        })

        expect(result).toEqual(null)
      }
    )

    scenario(
      'validates user owns the recipe',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        })

        const query = deleteRecipeDirectionGroup({
          id: scenario.recipeDirectionGroup.fromNotMyRecipeOne.id,
        })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )

    scenario(
      'validates user is authenticated',
      async (scenario: StandardScenario) => {
        mockCurrentUser(null)

        const query = deleteRecipeDirectionGroup({
          id: scenario.recipeDirectionGroup.fromMyRecipeOne.id,
        })

        await expect(query).rejects.toThrow(AuthenticationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )
  })
})
