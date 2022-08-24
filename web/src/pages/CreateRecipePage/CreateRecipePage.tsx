import { BsCheck } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import HeaderActionButton from 'src/components/buttons/HeaderActionButton/HeaderActionButton'
import Logo from 'src/components/Logo'
import EditRecipeHeader from 'src/layouts/EditRecipeMobileLayout/EditRecipeHeader'

const CreateRecipePage = () => {
  return (
    <>
      <MetaTags title="CreateRecipe" description="CreateRecipe page" />

      <EditRecipeHeader>
        <HeaderActionButton leftIcon={<IoMdClose />}>Cancel</HeaderActionButton>
        <Logo fontSize="24px" />
        <HeaderActionButton leftIcon={<BsCheck />}>Save</HeaderActionButton>
      </EditRecipeHeader>

      <h1>CreateRecipePage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/CreateRecipePage/CreateRecipePage.tsx</code>
      </p>
      <p>
        My default route is named <code>createRecipe</code>, link to me with `
        <Link to={routes.createRecipe()}>CreateRecipe</Link>`
      </p>
    </>
  )
}

export default CreateRecipePage
