import type {
  QueryResolvers,
  MutationResolvers,
  RecipeIngredientGroupResolvers,
  UpdateRecipeIngredientGroupInput,
} from 'types/graphql'

import { validate, validateWith } from '@redwoodjs/api'
import { ForbiddenError, ValidationError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

const recipeIngredientGroupWithUser = async (id: number) => {
  const record = await db.recipeIngredientGroup.findUnique({
    where: {
      id,
    },
    include: {
      recipe: {
        select: {
          userId: true,
        },
      },
    },
  })

  return record
}

const validateRecipeBelongsToCurrentUser = (record) => {
  if (record && record.recipe.userId !== context.currentUser.id) {
    throw new ForbiddenError("You don't have permission to do that")
  }
}

export const recipeIngredientGroups: QueryResolvers['recipeIngredientGroups'] =
  async (recipeId: number) => {
    requireAuth()

    return db.recipeIngredientGroup.findMany({
      where: {
        recipe: {
          id: recipeId,
          userId: context.currentUser.id,
        },
      },
    })
  }

export const recipeIngredientGroup = async ({ id }) => {
  requireAuth()

  const record = await recipeIngredientGroupWithUser(id)

  if (record?.recipe.userId !== context.currentUser.id) {
    return null
  }

  return db.recipeIngredientGroup.findUnique({
    where: {
      id,
    },
  })
}

export const updateRecipeIngredientGroup: MutationResolvers['updateRecipeIngredientGroup'] =
  async ({ id, input }) => {
    requireAuth()

    const record = await recipeIngredientGroupWithUser(id)

    // Validate user owns the recipe
    validateWith(() => validateRecipeBelongsToCurrentUser(record))

    const givenKeys = Object.keys(
      input
    ) as (keyof UpdateRecipeIngredientGroupInput)[]
    const sanitisedInput: UpdateRecipeIngredientGroupInput = {}

    // validates ingredients
    if (givenKeys.includes('ingredients')) {
      validate(input.ingredients, 'Ingredients', { presence: true })
      validateWith(() => {
        if (!input.ingredients || !input.ingredients.length) {
          throw new ValidationError('At least 1 ingredient must be present')
        }
      })

      sanitisedInput.ingredients = input.ingredients
    }

    // Validates name
    if (givenKeys.includes('name')) {
      validate(input.name, 'Name', {
        presence: {
          allowEmptyString: false,
          allowNull: false,
          allowUndefined: false,
        },
      })

      sanitisedInput.name = input.name
    }

    return db.recipeIngredientGroup.update({
      data: sanitisedInput,
      where: { id },
    })
  }

export const deleteRecipeIngredientGroup: MutationResolvers['deleteRecipeIngredientGroup'] =
  async ({ id }) => {
    requireAuth()

    const record = await recipeIngredientGroupWithUser(id)
    validateWith(() => validateRecipeBelongsToCurrentUser(record))

    return db.recipeIngredientGroup.delete({
      where: { id },
    })
  }

export const RecipeIngredientGroup: RecipeIngredientGroupResolvers = {
  recipe: (_obj, { root }) =>
    db.recipeIngredientGroup.findUnique({ where: { id: root.id } }).recipe(),
}
