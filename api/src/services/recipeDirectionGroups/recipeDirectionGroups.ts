import type {
  MutationResolvers,
  QueryResolvers,
  RecipeDirectionGroupResolvers,
} from 'types/graphql'

import { validateWith } from '@redwoodjs/api'
import { ForbiddenError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

const validateRecipeBelongsToCurrentUser = (item) => {
  if (item && item.recipe.userId !== context.currentUser.id) {
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

  const dbItem = await recipeDirectionGroupWithUser(id)
  validateWith(() => validateRecipeBelongsToCurrentUser(dbItem))

  return db.recipeDirectionGroup.findUnique({
    where: {
      id,
    },
  })
}

export const updateRecipeDirectionGroup: MutationResolvers['updateRecipeDirectionGroup'] =
  async ({ id, input }) => {
    requireAuth()

    const dbItem = await recipeDirectionGroupWithUser(id)
    validateWith(() => validateRecipeBelongsToCurrentUser(dbItem))

    return db.recipeDirectionGroup.update({
      data: input,
      where: { id },
    })
  }

export const deleteRecipeDirectionGroup: MutationResolvers['deleteRecipeDirectionGroup'] =
  async ({ id }) => {
    requireAuth()

    const dbItem = await recipeDirectionGroupWithUser(id)
    validateWith(() => validateRecipeBelongsToCurrentUser(dbItem))

    return db.recipeDirectionGroup.delete({
      where: { id },
    })
  }

export const RecipeDirectionGroup: RecipeDirectionGroupResolvers = {
  recipe: (_obj, { root }) =>
    db.recipeDirectionGroup.findUnique({ where: { id: root.id } }).recipe(),
}
