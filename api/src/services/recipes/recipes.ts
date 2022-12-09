import type {
  CreateRecipeInput,
  MutationResolvers,
  QueryResolvers,
  RecipeCategory,
  RecipeResolvers,
  UpdateRecipeInput,
} from 'types/graphql'

import { validate, validateWith } from '@redwoodjs/api'
import { ForbiddenError, ValidationError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const RECIPE_CATEGORIES: readonly RecipeCategory[] = [
  'BREAKFAST',
  'DESSERT',
  'DINNER',
  'LUNCH',
  'OTHER',
  'SNACK',
]

export const recipes: QueryResolvers['recipes'] = async ({ category }) => {
  requireAuth()

  return db.recipe.findMany({
    where: {
      userId: context.currentUser.id,
      ...(category ? { categories: { has: category } } : {}),
    },
  })
}

export const recipe: QueryResolvers['recipe'] = async ({ id }) => {
  requireAuth()

  const result = await db.recipe.findUnique({
    where: { id },
  })

  if (result && result.userId !== context.currentUser.id) {
    return null
  }

  return result
}

export const createRecipe: MutationResolvers['createRecipe'] = async ({
  input,
}) => {
  requireAuth()

  const givenKeys = Object.keys(input) as (keyof CreateRecipeInput)[]

  // Validate categories
  validate(input.categories, 'Categories', { presence: true })
  validateWith(() => {
    const validCategories = [...RECIPE_CATEGORIES]

    if (!input.categories || !input.categories.length) {
      throw new ValidationError('Must provide at least 1 category')
    } else {
      input.categories.forEach((category) => {
        if (validCategories.indexOf(category) === -1) {
          throw new ValidationError(`Invalid category passed: "${category}"`)
        }
      })
    }
  })

  // Validate length
  if (givenKeys.includes('length')) {
    validate(input.length, 'Length', { presence: true })
    validateWith(() => {
      if (typeof input.length !== 'number') {
        throw new ValidationError('Length must be a number')
      }
    })
  }

  // Validate name
  validate(input.name, 'Name', {
    presence: {
      allowEmptyString: false,
      allowNull: false,
      allowUndefined: false,
    },
  })
  validateWith(() => {
    if (typeof input.name !== 'string') {
      throw new ValidationError('Name must be a string')
    }
  })

  // Validate servings
  if (givenKeys.includes('servings')) {
    validate(input.servings, 'Servings', { presence: true })
    validateWith(() => {
      if (typeof input.servings !== 'number') {
        throw new ValidationError('Servings must be a number')
      }
    })
  }

  // Validates sourceURL
  if (givenKeys.includes('sourceUrl') && input.sourceUrl.length) {
    validate(input.sourceUrl, 'Source URL', {
      presence: {
        allowEmptyString: true,
        allowNull: true,
        allowUndefined: true,
      },
      format: {
        message: 'Source URL is invalid',
        pattern:
          /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      },
    })
  }

  let newRecipe = await db.recipe.create({
    data: {
      name: input.name,
      categories: input.categories,
      length: input.length,
      servings: input.servings,
      sourceUrl: input.sourceUrl,
      user: {
        connect: {
          id: context.currentUser.id,
        },
      },
      directionGroups: {
        createMany: {
          data: input.directionGroups,
        },
      },
      ingredientGroups: {
        createMany: {
          data: input.ingredientGroups,
        },
      },
    },
  })

  if (input.recipeImageIds.length) {
    newRecipe = await db.recipe.update({
      data: {
        recipeImages: {
          connect: {
            id: input.recipeImageIds[0],
          },
        },
      },
      where: {
        id: newRecipe.id,
      },
    })
  }

  return newRecipe
}

export const updateRecipe: MutationResolvers['updateRecipe'] = async ({
  id,
  input,
}) => {
  requireAuth()

  const item = await db.recipe.findUnique({ where: { id } })

  // Validate user owns the recipe
  if (item) {
    validateWith(() => {
      if (item.userId !== context.currentUser.id) {
        throw new ForbiddenError("You don't have permission to do that")
      }
    })
  }

  const sanitisedInput: UpdateRecipeInput = {}
  const givenKeys = Object.keys(input) as (keyof UpdateRecipeInput)[]

  // Validates categories
  if (givenKeys.includes('categories')) {
    validateWith(() => {
      const validCategories = [...RECIPE_CATEGORIES]

      if (!input.categories || !input.categories.length) {
        throw new ValidationError('Must provide at least 1 category')
      } else {
        input.categories.forEach((category) => {
          if (validCategories.indexOf(category) === -1) {
            throw new ValidationError(`Invalid category passed: "${category}"`)
          }
        })
      }
    })

    sanitisedInput.categories = input.categories
  }

  // Validate length
  if (givenKeys.includes('length')) {
    validate(input.length, 'Length', {
      presence: {
        allowEmptyString: false,
        allowNull: false,
        allowUndefined: false,
      },
    })

    validateWith(() => {
      if (typeof input.length !== 'number') {
        throw new ValidationError('Length must be a number')
      }
    })

    sanitisedInput.length = input.length
  }

  // Validate name
  if (givenKeys.includes('name')) {
    validate(input.name, 'Name', {
      presence: {
        allowEmptyString: false,
        allowNull: false,
        allowUndefined: false,
      },
    })

    validateWith(() => {
      if (typeof input.name !== 'string') {
        throw new ValidationError('Name must be a string')
      }
    })

    sanitisedInput.name = input.name
  }

  // Validate servings
  if (givenKeys.includes('servings')) {
    validate(input.servings, 'Servings', {
      presence: {
        allowEmptyString: false,
        allowNull: false,
        allowUndefined: false,
      },
    })

    validateWith(() => {
      if (typeof input.servings !== 'number') {
        throw new ValidationError('Servings must be a number')
      }
    })

    sanitisedInput.servings = input.servings
  }

  // Validates sourceURL
  if (givenKeys.includes('sourceUrl')) {
    validate(input.sourceUrl, 'Source URL', {
      presence: {
        allowEmptyString: true,
        allowNull: true,
        allowUndefined: true,
      },
      format: {
        message: 'Source URL is invalid',
        pattern:
          /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      },
    })

    sanitisedInput.sourceUrl = input.sourceUrl
  }

  return db.recipe.update({
    data: sanitisedInput,
    where: { id },
  })
}

export const deleteRecipe: MutationResolvers['deleteRecipe'] = async ({
  id,
}) => {
  requireAuth()

  const item = await db.recipe.findUnique({
    where: { id },
  })

  // Validate user owns the recipe
  if (item) {
    validateWith(() => {
      if (item.userId !== context.currentUser.id) {
        throw new ForbiddenError("You don't have permission to do that")
      }
    })
  }

  return db.recipe.delete({
    where: { id },
  })
}

export const Recipe: RecipeResolvers = {
  directionGroups: (_obj, { root }) =>
    db.recipe.findUnique({ where: { id: root.id } }).directionGroups(),
  ingredientGroups: (_obj, { root }) =>
    db.recipe.findUnique({ where: { id: root.id } }).ingredientGroups(),
  recipeImages: (_obj, { root }) =>
    db.recipe.findUnique({ where: { id: root.id } }).recipeImages(),
  user: (_obj, { root }) =>
    db.recipe.findUnique({ where: { id: root.id } }).user(),
}
