import { useState } from 'react'

import { Heading } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import CategoryFilters, {
  ICategoryFilter,
} from 'src/components/CategoryFilters/CategoryFilters'
import RecipesCell from 'src/components/RecipesCell'
import { SideMenuHeader } from 'src/layouts/SideMenuLayout'

const ExplorePage = () => {
  // TODO: use _activeRecipeFilter
  const [_activeRecipeFilter, setActiveRecipeFilter] =
    useState<ICategoryFilter | null>(null)

  const onChangeFilter = (category: ICategoryFilter) => {
    setActiveRecipeFilter(category)
  }

  return (
    <>
      <MetaTags title="Explore" description="Explore page" />

      <SideMenuHeader>
        <Heading as="h1" fontWeight={400} lineHeight="1.2em" mt={4}>
          Explore Recipes
        </Heading>

        <CategoryFilters mt={4} onChangeFilter={onChangeFilter} />
      </SideMenuHeader>

      <RecipesCell />
    </>
  )
}

export default ExplorePage
