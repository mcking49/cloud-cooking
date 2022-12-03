import type {
  MutationResolvers,
  QueryResolvers,
  RecipeDirectionGroupResolvers,
  UpdateRecipeDirectionGroupInput,
} from 'types/graphql'

import { validate, validateWith } from '@redwoodjs/api'
import { ForbiddenError, ValidationError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

const validateRecipeBelongsToCurrentUser = (record) => {
  if (record && record.recipe.userId !== context.currentUser.id) {
    throw new ForbiddenError("You don't have permission to do that")
  }
}

const recipeDirectionGroupWithUser = async (id: number) => {
  const item = await db.recipeDirectionGroup.findUnique({
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

  return item
}

export const recipeDirectionGroups: QueryResolvers['recipeDirectionGroups'] =
  async (recipeId: number) => {
    requireAuth()

    return db.recipeDirectionGroup.findMany({
      where: {
        recipe: {
          id: recipeId,
          userId: context.currentUser.id,
        },
      },
    })
  }

export const recipeDirectionGroup = async ({ id }) => {
  requireAuth()

  const record = await recipeDirectionGroupWithUser(id)

  if (record?.recipe?.userId !== context.currentUser.id) {
    return null
  }

  return db.recipeDirectionGroup.findUnique({
    where: {
      id,
    },
  })
}

export const updateRecipeDirectionGroup: MutationResolvers['updateRecipeDirectionGroup'] =
  async ({ id, input }) => {
    requireAuth()

    const record = await recipeDirectionGroupWithUser(id)

    // Validate user owns the recipe
    validateWith(() => validateRecipeBelongsToCurrentUser(record))

    const givenKeys = Object.keys(
      input
    ) as (keyof UpdateRecipeDirectionGroupInput)[]
    const sanitisedInput: UpdateRecipeDirectionGroupInput = {}

    // Validates directions
    if (givenKeys.includes('directions')) {
      validate(input.directions, 'Directions', { presence: true })
      validateWith(() => {
        if (!input.directions || !input.directions.length) {
          throw new ValidationError('At least 1 direction must be present')
        }
      })

      sanitisedInput.directions = input.directions
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

    return db.recipeDirectionGroup.update({
      data: sanitisedInput,
      where: { id },
    })
  }

export const deleteRecipeDirectionGroup: MutationResolvers['deleteRecipeDirectionGroup'] =
  async ({ id }) => {
    requireAuth()

    const record = await recipeDirectionGroupWithUser(id)
    validateWith(() => validateRecipeBelongsToCurrentUser(record))

    return db.recipeDirectionGroup.delete({
      where: { id },
    })
  }

export const RecipeDirectionGroup: RecipeDirectionGroupResolvers = {
  recipe: (_obj, { root }) =>
    db.recipeDirectionGroup.findUnique({ where: { id: root.id } }).recipe(),
}
