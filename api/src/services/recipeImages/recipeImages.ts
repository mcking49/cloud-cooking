import type {
  MutationResolvers,
  QueryResolvers,
  RecipeImageResolvers,
  UpdateRecipeImageInput,
} from 'types/graphql'

import { validate, validateWith } from '@redwoodjs/api'
import { ForbiddenError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

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

    validate(input.recipeId, 'Recipe Id', { presence: true })

    // Validate user owns the recipe
    const recipeRecord = await db.recipe.findUnique({
      where: { id: input.recipeId },
      select: { userId: true },
    })

    validateWith(() => {
      if (!recipeRecord || recipeRecord.userId !== context.currentUser.id) {
        throw new ForbiddenError("You don't have permission to do that")
      }
    })

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

    validateWith(() => {
      if (record.recipe.userId !== context.currentUser.id) {
        throw new ForbiddenError("You don't have permission to do that")
      }
    })

    const givenKeys = Object.keys(input) as (keyof UpdateRecipeImageInput)[]
    const sanitisedInput: UpdateRecipeImageInput = {}

    if (givenKeys.includes('url')) {
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

      sanitisedInput.url = input.url
    }

    return db.recipeImage.update({
      data: sanitisedInput,
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
