import { faker } from '@faker-js/faker'

import { ServiceValidationError } from '@redwoodjs/api'
import { CurrentUser } from '@redwoodjs/auth'
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
        const currentUser: CurrentUser = {
          email: scenario.user.currentUser.email,
          id: scenario.user.currentUser.id,
          firstName: scenario.user.currentUser.firstName,
          lastName: scenario.user.currentUser.lastName,
        }

        mockCurrentUser(currentUser)

        const result = await recipeDirectionGroups(scenario.recipe.myRecipe.id)

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
      async (scenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.currentUser.email,
          id: scenario.user.currentUser.id,
          firstName: scenario.user.currentUser.firstName,
          lastName: scenario.user.currentUser.lastName,
        }

        mockCurrentUser(currentUser)

        const result = await recipeDirectionGroups(
          scenario.recipe.anotherRecipe.id
        )

        expect(result.length).toEqual(0)
      }
    )

    scenario(
      'throws an error when user is not authenticated',
      async (scenario: StandardScenario) => {
        mockCurrentUser(null)
        const query = recipeDirectionGroups(scenario.recipe.myRecipe.id)

        await expect(query).rejects.toThrow(AuthenticationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )
  })

  describe('findUnique', () => {
    scenario('returns a single recipe', async (scenario) => {
      const currentUser: CurrentUser = {
        email: scenario.user.currentUser.email,
        id: scenario.user.currentUser.id,
        firstName: scenario.user.currentUser.firstName,
        lastName: scenario.user.currentUser.lastName,
      }

      mockCurrentUser(currentUser)

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
        const currentUser: CurrentUser = {
          email: scenario.user.currentUser.email,
          id: scenario.user.currentUser.id,
          firstName: scenario.user.currentUser.firstName,
          lastName: scenario.user.currentUser.lastName,
        }

        mockCurrentUser(currentUser)

        const takenIds = Object.keys(scenario.recipeDirectionGroup).map(
          (key) => scenario.recipeDirectionGroup[key].id
        )
        const nonExistentId = takenIds.reduce((total, val) => total + val, 0)

        const result = await recipeDirectionGroup({ id: nonExistentId })

        expect(result).toEqual(null)
      }
    )

    scenario(
      "throws an error when recipe doesn't belong to currentUser",
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.currentUser.email,
          id: scenario.user.currentUser.id,
          firstName: scenario.user.currentUser.firstName,
          lastName: scenario.user.currentUser.lastName,
        }

        mockCurrentUser(currentUser)

        const notMyRecipeDirectionGroup =
          scenario.recipeDirectionGroup.fromAnotherRecipeOne

        const query = recipeDirectionGroup({ id: notMyRecipeDirectionGroup.id })
        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )

    scenario(
      'throws an error when user is not authenticated',
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
        const currentUser: CurrentUser = {
          email: scenario.user.currentUser.email,
          id: scenario.user.currentUser.id,
          firstName: scenario.user.currentUser.firstName,
          lastName: scenario.user.currentUser.lastName,
        }
        mockCurrentUser(currentUser)

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
      "throws an error if user doesn't own the recipe",
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.currentUser.email,
          id: scenario.user.currentUser.id,
          firstName: scenario.user.currentUser.firstName,
          lastName: scenario.user.currentUser.lastName,
        }
        mockCurrentUser(currentUser)

        const newName = faker.commerce.productName()

        const query = updateRecipeDirectionGroup({
          id: scenario.recipeDirectionGroup.fromAnotherRecipeOne.id,
          input: { name: newName },
        })

        await expect(query).rejects.toThrow(ServiceValidationError)

        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )

    scenario(
      'throws an error if user is not authenticated',
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
  })

  describe('delete', () => {
    scenario(
      'deletes a recipeDirectionGroup when the recipe belongs to the current user',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.currentUser.email,
          id: scenario.user.currentUser.id,
          firstName: scenario.user.currentUser.firstName,
          lastName: scenario.user.currentUser.lastName,
        }
        mockCurrentUser(currentUser)

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
      "throws an error if user doesn't own the recipe",
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.currentUser.email,
          id: scenario.user.currentUser.id,
          firstName: scenario.user.currentUser.firstName,
          lastName: scenario.user.currentUser.lastName,
        }
        mockCurrentUser(currentUser)

        const query = deleteRecipeDirectionGroup({
          id: scenario.recipeDirectionGroup.fromAnotherRecipeOne.id,
        })

        await expect(query).rejects.toThrow(ServiceValidationError)

        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )

    scenario(
      'throws an error if user is not authenticated',
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
