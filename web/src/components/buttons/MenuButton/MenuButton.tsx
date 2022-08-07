import { IconButtonProps } from '@chakra-ui/react'
import { CgMenuLeft } from 'react-icons/cg'

import { IconButton } from '../IconButton'

type MenuButtonProps = Omit<IconButtonProps, 'aria-label' | 'icon'>

const MenuButton: React.FC<MenuButtonProps> = (props) => (
  <IconButton aria-label="Toggle Menu" icon={<CgMenuLeft />} {...props} />
)

export default MenuButton
