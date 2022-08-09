import type {
  QueryResolvers,
  MutationResolvers,
  RecipeResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const RECIPE_CATEGORIES = [
  'BREAKFAST',
  'DESSERT',
  'DINNER',
  'LUNCH',
  'OTHER',
  'SNACK',
] as const
export type RecipeCategory = typeof RECIPE_CATEGORIES[number]

export const recipes: QueryResolvers['recipes'] = (userId: number) => {
  return db.recipe.findMany({
    where: {
      userId,
    },
  })
}

export const recipe: QueryResolvers['recipe'] = ({ id }) => {
  return db.recipe.findUnique({
    where: { id },
  })
}

export const createRecipe: MutationResolvers['createRecipe'] = ({ input }) => {
  return db.recipe.create({
    data: input,
  })
}

export const updateRecipe: MutationResolvers['updateRecipe'] = ({
  id,
  input,
}) => {
  return db.recipe.update({
    data: input,
    where: { id },
  })
}

export const deleteRecipe: MutationResolvers['deleteRecipe'] = ({ id }) => {
  return db.recipe.delete({
    where: { id },
  })
}

export const Recipe: RecipeResolvers = {
  directionGroups: (_obj, { root }) =>
    db.recipe.findUnique({ where: { id: root.id } }).directionGroups(),
  ingredientGroups: (_obj, { root }) =>
    db.recipe.findUnique({ where: { id: root.id } }).ingredientGroups(),
  recipeImage: (_obj, { root }) =>
    db.recipe.findUnique({ where: { id: root.id } }).recipeImage(),
  user: (_obj, { root }) =>
    db.recipe.findUnique({ where: { id: root.id } }).user(),
}
