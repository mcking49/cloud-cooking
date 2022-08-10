import type {
  QueryResolvers,
  MutationResolvers,
  UserResolvers,
} from 'types/graphql'

import { validateWith } from '@redwoodjs/api'
import { ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  validateWith(() => {
    if (id !== context.currentUser.id) {
      throw new ForbiddenError("You don't have permission to do that")
    }
  })

  return db.user.update({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
    },
    where: { id },
  })
}

export const User: UserResolvers = {
  recipes: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).recipes(),
}
