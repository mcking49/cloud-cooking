import {
  Heading,
  HStack,
  Icon,
  Image,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react'
import { capitalize } from 'lodash/fp'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { RecipeCategory } from 'types/graphql'

type RecipeCardProps = {
  imageUrl: string
  name: string
  categories: RecipeCategory[]
  length?: number
}

const RecipeCard = ({
  categories,
  imageUrl,
  name,
  length,
}: RecipeCardProps) => {
  return (
    <VStack
      as="article"
      width="full"
      borderRadius="4px"
      backgroundColor="white"
      overflow="hidden"
      spacing={0}
    >
      {imageUrl && (
        <Image src={imageUrl} alt={name} boxSize="152px" objectFit="cover" />
      )}

      <VStack padding={3} width="full" alignItems="flex-start">
        <Heading
          as="h3"
          fontFamily="PT Sans"
          fontSize="16px"
          lineHeight="1.2em"
          fontWeight={400}
        >
          {name}
        </Heading>

        <HStack>
          {categories.map((category) => (
            <Tag
              key={category}
              variant="solid"
              backgroundColor="#F3D191"
              color="blue.800"
              borderRadius="2px"
              fontSize="6px"
              lineHeight="1.2em"
              padding="2px 6px"
              minHeight={0}
              minWidth={0}
            >
              {capitalize(category)}
            </Tag>
          ))}

          {length && (
            <>
              <Icon as={AiOutlineClockCircle} h={2} w={2} />

              <Text variant="hint" as="caption" fontSize="6px" color="blue.800">
                {length} mins
              </Text>
            </>
          )}
        </HStack>
      </VStack>
    </VStack>
  )
}

export default RecipeCard
