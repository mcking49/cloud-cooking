import { faker } from '@faker-js/faker'
import { RecipeCategory } from 'types/graphql'

import { ServiceValidationError } from '@redwoodjs/api'
import { CurrentUser } from '@redwoodjs/auth'
import { AuthenticationError } from '@redwoodjs/graphql-server'

import {
  createRecipe,
  deleteRecipe,
  recipe,
  recipes,
  updateRecipe,
} from './recipes'
import { fakeRecipe, StandardScenario } from './recipes.scenarios'

describe('recipes', () => {
  describe('findMany', () => {
    scenario(
      'returns all recipes belonging to currentUser',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const result = await recipes()

        const recipeKeys = Object.keys(scenario.recipe)
        const totalMyRecipes = recipeKeys.filter((val) =>
          val.includes('myRecipe')
        ).length

        expect(result.length).toEqual(totalMyRecipes)
      }
    )

    scenario('validates user is authenticated', async () => {
      mockCurrentUser(null)
      const query = recipes()

      await expect(query).rejects.toThrow(AuthenticationError)
      await expect(query).rejects.toThrowError(
        "You don't have permission to do that"
      )
    })
  })

  describe('findUnique', () => {
    scenario('returns a single recipe', async (scenario: StandardScenario) => {
      const currentUser: CurrentUser = {
        email: scenario.user.me.email,
        id: scenario.user.me.id,
        firstName: scenario.user.me.firstName,
        lastName: scenario.user.me.lastName,
      }

      mockCurrentUser(currentUser)

      const myRecipe = scenario.recipe.myRecipeOne
      const result = await recipe({ id: myRecipe.id })

      expect(result).toEqual(myRecipe)
    })

    scenario(
      'returns null if item is not found',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const takenIds = Object.keys(scenario.recipe).map(
          (key) => scenario.recipe[key].id
        )

        const nonExistentId = takenIds.reduce((total, val) => total + val, 0)

        const result = await recipe({ id: nonExistentId })

        expect(result).toEqual(null)
      }
    )

    scenario(
      "returns null if recipe doesn't belong to currentUser",
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const result = await recipe({ id: scenario.recipe.notMyRecipeOne.id })

        expect(result).toEqual(null)
      }
    )

    scenario(
      'validates user is authenticated',
      async (scenario: StandardScenario) => {
        mockCurrentUser(null)

        const query = recipe({
          id: scenario.recipe.myRecipeOne.id,
        })

        await expect(query).rejects.toThrow(AuthenticationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )
  })

  describe('create', () => {
    // FIXME: need to create relations in this test.
    // scenario('creates a recipe', async (scenario: StandardScenario) => {
    //   const currentUser: CurrentUser = {
    //     email: scenario.user.me.email,
    //     id: scenario.user.me.id,
    //     firstName: scenario.user.me.firstName,
    //     lastName: scenario.user.me.lastName,
    //   }

    //   mockCurrentUser(currentUser)

    //   const newRecipe = fakeRecipe({
    //     userId: currentUser.id,
    //     withLength: true,
    //     withServings: true,
    //     withSourceUrl: true,
    //   })

    //   const result = await createRecipe({ input: newRecipe })

    //   expect(result.categories).toEqual(newRecipe.categories)
    //   expect(result.length).toEqual(newRecipe.length)
    //   expect(result.name).toEqual(newRecipe.name)
    //   expect(result.servings).toEqual(newRecipe.servings)
    //   expect(result.sourceUrl).toEqual(newRecipe.sourceUrl)
    //   expect(result.userId).toEqual(newRecipe.userId)
    // })

    // FIXME: something wrong because of the relations
    // scenario(
    //   'userId is always the currentUser',
    //   async (scenario: StandardScenario) => {
    //     const currentUser: CurrentUser = {
    //       email: scenario.user.me.email,
    //       id: scenario.user.me.id,
    //       firstName: scenario.user.me.firstName,
    //       lastName: scenario.user.me.lastName,
    //     }

    //     mockCurrentUser(currentUser)

    //     const newRecipe = fakeRecipe({ userId: scenario.user.notMe.id })

    //     const result = await createRecipe({ input: newRecipe })

    //     expect(result.userId).toEqual(currentUser.id)
    //   }
    // )

    scenario(
      'validates given category is a known category type',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const newRecipe = fakeRecipe({ userId: currentUser.id })
        const invalidCategory = 'INVALID'
        newRecipe.categories.push(invalidCategory as RecipeCategory)

        const query = createRecipe({ input: newRecipe })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError(
          `Invalid category passed: "${invalidCategory}"`
        )
      }
    )

    scenario(
      'validates category is present',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const newRecipe = fakeRecipe({ userId: currentUser.id })
        newRecipe.categories = null

        const nullQuery = createRecipe({ input: newRecipe })

        await expect(nullQuery).rejects.toThrow(ServiceValidationError)
        await expect(nullQuery).rejects.toThrowError(
          'Categories must be present'
        )

        newRecipe.categories = []

        const emptyQuery = createRecipe({ input: newRecipe })

        await expect(emptyQuery).rejects.toThrow(ServiceValidationError)
        await expect(emptyQuery).rejects.toThrowError(
          'Must provide at least 1 category'
        )
      }
    )

    scenario(
      'validates length is present',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const newRecipe = fakeRecipe()
        newRecipe.length = null
        const query = createRecipe({ input: newRecipe })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError('Length must be present')
      }
    )

    scenario(
      'validates length is a number',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const newRecipe = fakeRecipe()
        newRecipe.length = `${newRecipe.length}` as unknown as number
        const query = createRecipe({ input: newRecipe })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError('Length must be a number')
      }
    )

    scenario(
      'validates name is present',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const newRecipe = fakeRecipe()
        newRecipe.name = null
        const query = createRecipe({ input: newRecipe })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError('Name must be present')
      }
    )

    scenario(
      'validates name is a string',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const newRecipe = fakeRecipe()
        newRecipe.name = 5 as unknown as string
        const query = createRecipe({ input: newRecipe })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError('Name must be a string')
      }
    )

    scenario(
      'validates servings is present',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const newRecipe = fakeRecipe()
        newRecipe.servings = null
        const query = createRecipe({ input: newRecipe })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError('Servings must be present')
      }
    )

    scenario(
      'validates servings is a number',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const newRecipe = fakeRecipe()
        newRecipe.servings = `${newRecipe.servings}` as unknown as number
        const query = createRecipe({ input: newRecipe })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError('Servings must be a number')
      }
    )

    scenario(
      'validates sourceUrl string format',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const newRecipe = fakeRecipe()
        newRecipe.sourceUrl = faker.animal.bear()
        const query = createRecipe({ input: newRecipe })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError('Source URL is invalid')
      }
    )

    scenario('validates user is authenticated', async () => {
      mockCurrentUser(null)

      const newRecipe = fakeRecipe()
      const query = createRecipe({ input: newRecipe })

      await expect(query).rejects.toThrow(AuthenticationError)
      await expect(query).rejects.toThrowError(
        "You don't have permission to do that"
      )
    })
  })

  describe('update', () => {
    scenario('updates a recipe', async (scenario: StandardScenario) => {
      const currentUser: CurrentUser = {
        email: scenario.user.me.email,
        id: scenario.user.me.id,
        firstName: scenario.user.me.firstName,
        lastName: scenario.user.me.lastName,
      }

      mockCurrentUser(currentUser)

      const newName = faker.animal.bird()
      const original = scenario.recipe.myRecipeOne

      const result = await updateRecipe({
        id: original.id,
        input: { name: newName },
      })

      expect(result.name).toEqual(newName)
    })

    scenario(
      'validates currentUser owns the recipe',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const newName = faker.animal.bird()
        const notMyRecipe = scenario.recipe.notMyRecipeOne

        const query = updateRecipe({
          id: notMyRecipe.id,
          input: { name: newName },
        })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )

    scenario(
      'validates given category is a known category type',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const original = scenario.recipe.myRecipeOne
        const invalidCategory = 'INVALID' as RecipeCategory

        const query = updateRecipe({
          id: original.id,
          input: { categories: [invalidCategory] },
        })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError(
          `Invalid category passed: "${invalidCategory}"`
        )
      }
    )

    scenario(
      'validates length is a number',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const original = scenario.recipe.myRecipeOne
        const newLength = `${original.length}` as unknown as number
        const query = updateRecipe({
          id: original.id,
          input: { length: newLength },
        })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError('Length must be a number')
      }
    )

    scenario(
      'validates name is a string',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const original = scenario.recipe.myRecipeOne
        const newName = 5 as unknown as string
        const query = updateRecipe({
          id: original.id,
          input: { name: newName },
        })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError('Name must be a string')
      }
    )

    scenario(
      'validates servings is a number',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const original = scenario.recipe.myRecipeOne
        const newServings = `${original.servings}` as unknown as number
        const query = updateRecipe({
          id: original.id,
          input: { servings: newServings },
        })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError('Servings must be a number')
      }
    )

    scenario(
      'validates sourceUrl string format',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const original = scenario.recipe.myRecipeOne
        const newSourceUrl = faker.animal.bear()
        const query = updateRecipe({
          id: original.id,
          input: { sourceUrl: newSourceUrl },
        })

        await expect(query).rejects.toThrow(ServiceValidationError)
        await expect(query).rejects.toThrowError('Source URL is invalid')
      }
    )

    scenario(
      'validates user is authenticated',
      async (scenario: StandardScenario) => {
        mockCurrentUser(null)

        const original = scenario.recipe.myRecipeOne
        const newName = faker.animal.bird()
        const query = updateRecipe({
          id: original.id,
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
    scenario('deletes a recipe', async (scenario: StandardScenario) => {
      const currentUser: CurrentUser = {
        email: scenario.user.me.email,
        id: scenario.user.me.id,
        firstName: scenario.user.me.firstName,
        lastName: scenario.user.me.lastName,
      }

      mockCurrentUser(currentUser)

      const original = await deleteRecipe({
        id: scenario.recipe.myRecipeOne.id,
      })

      const result = await recipe({ id: original.id })

      expect(result).toEqual(null)
    })

    scenario(
      'validates user owns the recipe',
      async (scenario: StandardScenario) => {
        const currentUser: CurrentUser = {
          email: scenario.user.me.email,
          id: scenario.user.me.id,
          firstName: scenario.user.me.firstName,
          lastName: scenario.user.me.lastName,
        }

        mockCurrentUser(currentUser)

        const query = deleteRecipe({
          id: scenario.recipe.notMyRecipeOne.id,
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

        const query = deleteRecipe({
          id: scenario.recipe.myRecipeOne.id,
        })

        await expect(query).rejects.toThrow(AuthenticationError)
        await expect(query).rejects.toThrowError(
          "You don't have permission to do that"
        )
      }
    )
  })
})
