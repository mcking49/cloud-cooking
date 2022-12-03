export const schema = gql`
  type User {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String!
    firstName: String!
    fullName: String
    hashedPassword: String!
    lastName: String!
    recipes: [Recipe]!
    resetToken: String
    resetTokenExpiresAt: DateTime
    salt: String!
  }

  type Query {
    user(id: Int!): User @requireAuth
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
  }

  type Mutation {
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
  }
`
