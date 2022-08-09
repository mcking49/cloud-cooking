import { faker } from '@faker-js/faker'

import {
  recipes,
  recipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from './recipes'
import { fakeRecipe, StandardScenario } from './recipes.scenarios'

describe('recipes', () => {
  scenario('returns all recipes', async (scenario: StandardScenario) => {
    const result = await recipes()

    expect(result.length).toEqual(Object.keys(scenario.recipe).length)
  })

  scenario('returns a single recipe', async (scenario: StandardScenario) => {
    const result = await recipe({ id: scenario.recipe.one.id })

    expect(result).toEqual(scenario.recipe.one)
  })

  scenario('creates a recipe', async (scenario: StandardScenario) => {
    mockCurrentUser({
      id: scenario.recipe.two.userId,
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    })

    const recipe = fakeRecipe({ userId: scenario.recipe.two.userId })

    const result = await createRecipe({
      input: recipe,
    })

    expect(result.categories).toEqual(recipe.categories)
    expect(result.length).toEqual(recipe.length)
    expect(result.name).toEqual(recipe.name)
    expect(result.servings).toEqual(recipe.servings)
    expect(result.userId).toEqual(recipe.userId)
  })

  scenario('updates a recipe', async (scenario: StandardScenario) => {
    const name = faker.animal.fish()
    const original = await recipe({ id: scenario.recipe.one.id })

    const result = await updateRecipe({
      id: original.id,
      input: { name },
    })

    expect(result.name).toEqual(name)
  })

  scenario('deletes a recipe', async (scenario: StandardScenario) => {
    const original = await deleteRecipe({ id: scenario.recipe.one.id })
    const result = await recipe({ id: original.id })

    expect(result).toEqual(null)
  })
})
