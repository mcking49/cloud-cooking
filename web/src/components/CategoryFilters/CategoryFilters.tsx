import { FC, useEffect, useState } from 'react'

import { HStack, StackProps } from '@chakra-ui/react'
import { RecipeCategory } from 'types/graphql'

import { RECIPE_CATEGORIES } from 'src/lib/constants'

import CategoryFilter from '../CategoryFilter/CategoryFilter'

export type ICategoryFilter = RecipeCategory | 'ALL'

type Props = Omit<StackProps, 'children'> & {
  onChangeFilter: (category: ICategoryFilter) => void
}

const CATEGORY_FILTERS: readonly ICategoryFilter[] = [
  'ALL',
  ...RECIPE_CATEGORIES,
]

const CategoryFilters: FC<Props> = ({ onChangeFilter, ...rest }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryFilter>('ALL')

  const onClickFilter = (category: ICategoryFilter) => {
    setSelectedCategory(category)
    onChangeFilter(category)
  }

  useEffect(() => {
    onChangeFilter(selectedCategory)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HStack
      {...rest}
      overflowX="auto"
      __css={{ '::-webkit-scrollbar': { display: 'none' } }}
      spacing={2}
      gap={2}
    >
      {CATEGORY_FILTERS.map((category) => (
        <CategoryFilter
          isSelected={category === selectedCategory}
          key={category}
          onClick={() => onClickFilter(category)}
        >
          {category}
        </CategoryFilter>
      ))}
    </HStack>
  )
}

export default CategoryFilters
