import { BsCheck } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'

import { MetaTags } from '@redwoodjs/web'

import HeaderActionButton from 'src/components/buttons/HeaderActionButton'
import Logo from 'src/components/Logo'
import RecipeForm from 'src/components/RecipeForm'
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

      <RecipeForm />
    </>
  )
}

export default CreateRecipePage
