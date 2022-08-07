import { VStack } from '@chakra-ui/react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { HiOutlineSearch, HiPlus } from 'react-icons/hi'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'

import { routes } from '@redwoodjs/router'

import SideMenuLink from 'src/components/buttons/SideMenuLink'
import Logo from 'src/components/Logo'
import UserDetails from 'src/components/UserDetails'

export interface SideMenuNavProps {
  onClose?: () => void
}

const SideMenuNav: React.FC<SideMenuNavProps> = ({ onClose }) => {
  const closeMenu = () => {
    if (onClose) {
      return onClose()
    }
  }

  return (
    <VStack
      height="full"
      width="full"
      spacing={12}
      py={12}
      background="gray.50"
    >
      {/* Side Nav Header */}
      <VStack px={10} spacing={8} width="full">
        <Logo />
        <UserDetails />
      </VStack>

      {/* Side Nav Body (navigation links) */}
      <VStack width="full" alignItems="flex-start">
        <SideMenuLink
          to={routes.explore()}
          icon={HiOutlineSearch}
          activeIcon={FaSearch}
          onClick={closeMenu}
        >
          Explore
        </SideMenuLink>
        <SideMenuLink
          to={routes.favourites()}
          icon={MdFavoriteBorder}
          activeIcon={MdFavorite}
          onClick={closeMenu}
        >
          Favourites
        </SideMenuLink>
        <SideMenuLink
          to={routes.createRecipe()}
          icon={HiPlus}
          activeIcon={FaPlus}
          onClick={closeMenu}
        >
          Create Recipe
        </SideMenuLink>
      </VStack>
    </VStack>
  )
}

export default SideMenuNav
