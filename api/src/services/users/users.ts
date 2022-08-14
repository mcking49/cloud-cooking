import type {
  QueryResolvers,
  MutationResolvers,
  UserResolvers,
  UpdateUserInput,
} from 'types/graphql'

import { validate, validateWith } from '@redwoodjs/api'
import { ForbiddenError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const user: QueryResolvers['user'] = async () => {
  requireAuth()

  return db.user.findUnique({
    where: { id: context.currentUser.id },
  })
}

export const updateUser: MutationResolvers['updateUser'] = async ({
  id,
  input,
}) => {
  requireAuth()

  validateWith(() => {
    if (id !== context.currentUser.id) {
      throw new ForbiddenError("You don't have permission to do that")
    }
  })

  const sanitisedInput: UpdateUserInput = {}
  const givenKeys = Object.keys(input) as (keyof UpdateUserInput)[]

  // Validate firstName
  if (givenKeys.includes('firstName')) {
    validate(input.firstName, 'First Name', {
      presence: {
        allowEmptyString: false,
        allowNull: false,
        allowUndefined: false,
      },
    })

    sanitisedInput.firstName = input.firstName
  }

  // Validate lastName
  if (givenKeys.includes('lastName')) {
    validate(input.lastName, 'Last Name', {
      presence: {
        allowEmptyString: false,
        allowNull: false,
        allowUndefined: false,
      },
    })

    sanitisedInput.lastName = input.lastName
  }

  return db.user.update({
    data: sanitisedInput,
    where: { id },
  })
}

export const User: UserResolvers = {
  recipes: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).recipes(),
}
