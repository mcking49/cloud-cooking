import { faker } from '@faker-js/faker'

import { ServiceValidationError } from '@redwoodjs/api'
import { AuthenticationError } from '@redwoodjs/graphql-server'

import {
  recipeIngredientGroups,
  updateRecipeIngredientGroup,
  deleteRecipeIngredientGroup,
  recipeIngredientGroup,
} from './recipeIngredientGroups'
import type { StandardScenario } from './recipeIngredientGroups.scenarios'

describe('recipeIngredientGroups', () => {
  describe('findMany', () => {
    scenario(
      'returns all recipeIngredientGroups for a given recipe owned by the currentUser',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        })

        const result = await recipeIngredientGroups(
          scenario.recipe.myRecipeOne.id
        )

        const totalRecipes = Object.keys(scenario.recipeIngredientGroup).length

        const totalMyRecipes = Object.keys(
          scenario.recipeIngredientGroup
        ).filter((val) => val.includes('fromMyRecipe')).length

        const totalOtherRecipes = Object.keys(
          scenario.recipeIngredientGroup
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

        const result = await recipeIngredientGroups(
          scenario.recipe.notMyRecipeOne.id
        )

        expect(result.length).toEqual(0)
      }
    )

    scenario(
      'validates user is authenticated',
      async (scenario: StandardScenario) => {
        mockCurrentUser(null)
        const query = recipeIngredientGroups(scenario.recipe.myRecipeOne.id)

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

      const myRecipeIngredientGroup =
        scenario.recipeIngredientGroup.fromMyRecipeOne

      const result = await recipeIngredientGroup({
        id: myRecipeIngredientGroup.id,
      })

      expect(result).toEqual(myRecipeIngredientGroup)
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

        const takenIds = Object.keys(scenario.recipeIngredientGroup).map(
          (key) => scenario.recipeIngredientGroup[key].id
        )
        const nonExistentId = takenIds.reduce((total, val) => total + val, 0)

        const result = await recipeIngredientGroup({ id: nonExistentId })

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

        const notMyRecipeIngredientGroup =
          scenario.recipeIngredientGroup.fromNotMyRecipeOne

        const result = await recipeIngredientGroup({
          id: notMyRecipeIngredientGroup.id,
        })
        expect(result).toEqual(null)
      }
    )

    scenario(
      'validates user is authenticated',
      async (scenario: StandardScenario) => {
        mockCurrentUser(null)

        const query = recipeIngredientGroup({
          id: scenario.recipeIngredientGroup.fromMyRecipeOne.id,
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
      'updates a recipeIngredientGroup when the recipe belongs to the current user',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        })

        const original = await recipeIngredientGroup({
          id: scenario.recipeIngredientGroup.fromMyRecipeOne.id,
        })

        const newName = faker.commerce.productName()

        const result = await updateRecipeIngredientGroup({
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

        const query = updateRecipeIngredientGroup({
          id: scenario.recipeIngredientGroup.fromNotMyRecipeOne.id,
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

        const query = updateRecipeIngredientGroup({
          id: scenario.recipeIngredientGroup.fromMyRecipeOne.id,
          input: { name: newName },
        })

        await expect(query).rejects.toThrow(AuthenticationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )

    scenario('validates ingredients', async (scenario: StandardScenario) => {
      const currentUser = scenario.user.me
      mockCurrentUser({
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      })

      const original = scenario.recipeIngredientGroup.fromMyRecipeOne

      const queryEmpty = updateRecipeIngredientGroup({
        id: original.id,
        input: {
          ingredients: [],
        },
      })

      const queryNull = updateRecipeIngredientGroup({
        id: original.id,
        input: {
          ingredients: null,
        },
      })

      await expect(queryEmpty).rejects.toThrow(ServiceValidationError)
      await expect(queryEmpty).rejects.toThrowError(
        'At least 1 ingredient must be present'
      )
      await expect(queryNull).rejects.toThrow(ServiceValidationError)
      await expect(queryNull).rejects.toThrowError(
        'Ingredients must be present'
      )
    })

    scenario('validates name', async (scenario: StandardScenario) => {
      const currentUser = scenario.user.me
      mockCurrentUser({
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
      })

      const original = scenario.recipeIngredientGroup.fromMyRecipeOne

      const queryEmpty = updateRecipeIngredientGroup({
        id: original.id,
        input: {
          name: '',
        },
      })

      const queryNull = updateRecipeIngredientGroup({
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
      'deletes a recipeIngredientGroup when the recipe belongs to the current user',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        })

        const original = await deleteRecipeIngredientGroup({
          id: scenario.recipeIngredientGroup.fromMyRecipeOne.id,
        })

        const result = await recipeIngredientGroup({
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

        const query = deleteRecipeIngredientGroup({
          id: scenario.recipeIngredientGroup.fromNotMyRecipeOne.id,
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

        const query = deleteRecipeIngredientGroup({
          id: scenario.recipeIngredientGroup.fromMyRecipeOne.id,
        })

        await expect(query).rejects.toThrow(AuthenticationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )
  })
})
