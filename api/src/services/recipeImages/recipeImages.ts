import type {
  MutationResolvers,
  QueryResolvers,
  RecipeImageResolvers,
} from 'types/graphql'

import { ServiceValidationError, validate, validateWith } from '@redwoodjs/api'
import { ForbiddenError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

import { recipe } from '../recipes/recipes'

function validateUserOwnsRecipe(recipeImage) {
  if (recipeImage && recipeImage.recipe.userId !== context.currentUser.id) {
    throw new ForbiddenError("You don't have permission to do that")
  }
}

async function recipeImageWithUser(id: number) {
  const record = await db.recipeImage.findUnique({
    where: { id },
    select: {
      recipe: {
        select: {
          userId: true,
        },
      },
    },
  })

  return record
}

export const recipeImage: QueryResolvers['recipeImage'] = async ({ id }) => {
  requireAuth()

  const record = await recipeImageWithUser(id)
  validateWith(() => validateUserOwnsRecipe(record))

  return db.recipeImage.findUnique({
    where: {
      id,
    },
  })
}

export const createRecipeImage: MutationResolvers['createRecipeImage'] =
  async ({ input }) => {
    requireAuth()

    validate(input.url, 'Url', {
      presence: {
        allowEmptyString: false,
        allowNull: false,
        allowUndefined: false,
      },
      format: {
        pattern:
          /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      },
    })

    return db.recipeImage.create({
      data: input,
    })
  }

export const updateRecipeImage: MutationResolvers['updateRecipeImage'] =
  async ({ id, input }) => {
    requireAuth()

    const record = await recipeImageWithUser(id)

    // Validate image doesn't already belong to a recipe.
    validateWith(() => {
      if (record.recipe) {
        throw new ServiceValidationError(
          'This image already belongs to a recipe'
        )
      }
    })

    // Validate recipeId input is given
    validate(input.recipeId, 'Recipe ID', { presence: true })

    const recipeRecord = await recipe({ id: input.recipeId })

    // Validate given recipe exists
    validateWith(() => {
      if (!recipeRecord) {
        throw new ServiceValidationError('Given Recipe not found')
      }
    })

    return db.recipeImage.update({
      data: {
        recipe: {
          connect: {
            id: input.recipeId,
          },
        },
      },
      where: { id },
    })
  }

export const deleteRecipeImage: MutationResolvers['deleteRecipeImage'] =
  async ({ id }) => {
    requireAuth()

    const record = await recipeImageWithUser(id)

    // Validate user owns the recipe
    if (record) {
      validateWith(() => {
        if (record.recipe.userId !== context.currentUser.id) {
          throw new ForbiddenError("You don't have permission to do that")
        }
      })
    }

    return db.recipeImage.delete({
      where: { id },
    })
  }

export const RecipeImage: RecipeImageResolvers = {
  recipe: (_obj, { root }) =>
    db.recipeImage.findUnique({ where: { id: root.id } }).recipe(),
}
