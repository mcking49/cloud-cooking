import { FaSearch } from 'react-icons/fa'
import { HiOutlineSearch } from 'react-icons/hi'

import { LocationProvider } from '@redwoodjs/router'

import SideMenuLink from './SideMenuLink'

export const activeLink = () => {
  return (
    <LocationProvider location={{ pathname: '' }}>
      <SideMenuLink icon={HiOutlineSearch} activeIcon={FaSearch} to="">
        Explore
      </SideMenuLink>
    </LocationProvider>
  )
}

export const normalLink = () => {
  return (
    <SideMenuLink icon={HiOutlineSearch} activeIcon={FaSearch} to="">
      Explore
    </SideMenuLink>
  )
}

export default { title: 'Components/SideMenuLink' }
