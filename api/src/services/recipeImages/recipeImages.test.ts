import { ServiceValidationError } from '@redwoodjs/api'
import { AuthenticationError } from '@redwoodjs/graphql-server'

import {
  recipeImage,
  createRecipeImage,
  updateRecipeImage,
  deleteRecipeImage,
} from './recipeImages'
import { fakeRecipeImage, StandardScenario } from './recipeImages.scenarios'

describe('recipeImages', () => {
  describe('findUnique', () => {
    scenario('returns a recipeImage', async (scenario: StandardScenario) => {
      const currentUser = scenario.user.me
      mockCurrentUser({
        email: currentUser.email,
        firstName: currentUser.firstName,
        id: currentUser.id,
        lastName: currentUser.lastName,
      })

      const image = scenario.recipeImage.fromMyRecipeOne
      const result = await recipeImage({ id: image.id })

      expect(result.recipeId).toEqual(image.recipeId)
      expect(result.url).toEqual(image.url)
    })

    scenario(
      'validates user owns the recipe',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          email: currentUser.email,
          firstName: currentUser.firstName,
          id: currentUser.id,
          lastName: currentUser.lastName,
        })

        const image = scenario.recipeImage.fromNotMyRecipeOne

        const query = recipeImage({ id: image.id })

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

        const image = scenario.recipeImage.fromMyRecipeOne
        const query = recipeImage({ id: image.id })

        await expect(query).rejects.toThrow(AuthenticationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )
  })

  describe('create', () => {
    scenario('creates a recipeImage', async (scenario: StandardScenario) => {
      const currentUser = scenario.user.me
      mockCurrentUser({
        email: currentUser.email,
        firstName: currentUser.firstName,
        id: currentUser.id,
        lastName: currentUser.lastName,
      })

      const image = fakeRecipeImage()

      const result = await createRecipeImage({ input: image })

      expect(result.url).toEqual(image.url)
    })

    scenario(
      'validates url is not empty',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          email: currentUser.email,
          firstName: currentUser.firstName,
          id: currentUser.id,
          lastName: currentUser.lastName,
        })

        const image = fakeRecipeImage()

        const queryEmpty = createRecipeImage({
          input: {
            ...image,
            url: '',
          },
        })

        await expect(queryEmpty).rejects.toThrow(ServiceValidationError)
        await expect(queryEmpty).rejects.toThrowError('Url must be present')
      }
    )

    scenario(
      'validates url is not null',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          email: currentUser.email,
          firstName: currentUser.firstName,
          id: currentUser.id,
          lastName: currentUser.lastName,
        })

        const image = fakeRecipeImage()

        const queryNull = createRecipeImage({
          input: {
            ...image,
            url: null,
          },
        })

        await expect(queryNull).rejects.toThrow(ServiceValidationError)
        await expect(queryNull).rejects.toThrowError('Url must be present')
      }
    )

    scenario(
      'validates url is the correct format',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          email: currentUser.email,
          firstName: currentUser.firstName,
          id: currentUser.id,
          lastName: currentUser.lastName,
        })

        const image = fakeRecipeImage()

        const queryFormat = createRecipeImage({
          input: {
            ...image,
            url: 'invalid format',
          },
        })

        await expect(queryFormat).rejects.toThrow(ServiceValidationError)
        await expect(queryFormat).rejects.toThrowError(
          'Url is not formatted correctly'
        )
      }
    )

    scenario('validates user is authenticated', async () => {
      mockCurrentUser(null)

      const image = fakeRecipeImage()

      const query = createRecipeImage({ input: image })

      await expect(query).rejects.toThrow(AuthenticationError)
      await expect(query).rejects.toThrowError(
        "You don't have permission to do that"
      )
    })
  })

  describe('update', () => {
    scenario('updates a recipeImage', async (scenario: StandardScenario) => {
      const currentUser = scenario.user.me
      mockCurrentUser({
        email: currentUser.email,
        firstName: currentUser.firstName,
        id: currentUser.id,
        lastName: currentUser.lastName,
      })

      const image = scenario.recipeImage.unclaimed
      const recipeId = scenario.recipe.myRecipeOne.id

      const result = await updateRecipeImage({
        id: image.id,
        input: {
          recipeId,
        },
      })

      expect(result.recipeId).toEqual(recipeId)
    })

    scenario(
      'validates recipeId is given',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          email: currentUser.email,
          firstName: currentUser.firstName,
          id: currentUser.id,
          lastName: currentUser.lastName,
        })

        const image = scenario.recipeImage.unclaimed

        const queryEmpty = updateRecipeImage({
          id: image.id,
          input: {
            recipeId: null,
          },
        })

        await expect(queryEmpty).rejects.toThrow(ServiceValidationError)
        await expect(queryEmpty).rejects.toThrowError(
          'Recipe Id must be present'
        )
      }
    )

    scenario(
      'validates given recipeId exists',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          email: currentUser.email,
          firstName: currentUser.firstName,
          id: currentUser.id,
          lastName: currentUser.lastName,
        })

        const image = scenario.recipeImage.unclaimed
        const recipeId = scenario.recipe.notMyRecipeOne.id

        const query = updateRecipeImage({
          id: image.id,
          input: {
            recipeId,
          },
        })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError('Given Recipe not found')
      }
    )

    scenario(
      'validates image does not already belong to a recipe',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          email: currentUser.email,
          firstName: currentUser.firstName,
          id: currentUser.id,
          lastName: currentUser.lastName,
        })

        const image = scenario.recipeImage.fromMyRecipeOne
        const recipeId = scenario.recipe.myRecipeTwo.id

        const query = updateRecipeImage({
          id: image.id,
          input: {
            recipeId,
          },
        })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError(
          'This image already belongs to a recipe'
        )
      }
    )

    scenario(
      'validates user is authenticated',
      async (scenario: StandardScenario) => {
        mockCurrentUser(null)

        const image = scenario.recipeImage.unclaimed
        const recipeId = scenario.recipe.myRecipeOne.id

        const query = updateRecipeImage({
          id: image.id,
          input: { recipeId },
        })

        await expect(query).rejects.toThrow(AuthenticationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )
  })

  describe('delete', () => {
    scenario('deletes a recipeImage', async (scenario: StandardScenario) => {
      const currentUser = scenario.user.me
      mockCurrentUser({
        email: currentUser.email,
        firstName: currentUser.firstName,
        id: currentUser.id,
        lastName: currentUser.lastName,
      })

      const original = scenario.recipeImage.fromMyRecipeOne

      const record = await deleteRecipeImage({ id: original.id })

      const result = await recipeImage({ id: record.id })

      expect(result).toEqual(null)
    })

    scenario(
      'validates user owns the recipe',
      async (scenario: StandardScenario) => {
        const currentUser = scenario.user.me
        mockCurrentUser({
          email: currentUser.email,
          firstName: currentUser.firstName,
          id: currentUser.id,
          lastName: currentUser.lastName,
        })

        const image = scenario.recipeImage.fromNotMyRecipeOne

        const query = deleteRecipeImage({ id: image.id })

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

        const image = scenario.recipeImage.fromMyRecipeOne

        const query = deleteRecipeImage({ id: image.id })

        await expect(query).rejects.toThrow(AuthenticationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )
  })
})
