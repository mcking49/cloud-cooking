import { MetaTags } from '@redwoodjs/web'

import RecipeCell from 'src/components/RecipeCell'

type Props = {
  id: number
}

const RecipePage = ({ id }: Props) => {
  return (
    <>
      <MetaTags title="Recipe" description="Recipe page" />

      <RecipeCell id={id} />
    </>
  )
}

export default RecipePage
