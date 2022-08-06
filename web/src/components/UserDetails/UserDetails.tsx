import { Avatar, HStack, Text, VStack } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'

import H3 from '../typography/H3'

const UserDetails = () => {
  const { currentUser } = useAuth()

  return (
    <HStack spacing={4}>
      <Avatar size="sm" />

      <VStack spacing={0} alignItems="flex-start">
        <H3>
          {currentUser?.firstName} {currentUser?.lastName}
        </H3>

        <Text variant="caption">{currentUser?.email}</Text>
      </VStack>
    </HStack>
  )
}

export default UserDetails
