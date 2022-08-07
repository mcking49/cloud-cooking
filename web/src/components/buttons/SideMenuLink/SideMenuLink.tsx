import { Icon, Link, LinkProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'

import { Link as RWLink, useMatch } from '@redwoodjs/router'

interface SideMenuLinkProps extends LinkProps {
  activeIcon?: IconType
  icon: IconType
  to: string
}

const SideMenuLink: React.FC<SideMenuLinkProps> = ({
  activeIcon,
  children,
  icon,
  to,
  ...rest
}) => {
  const match = useMatch(to)
  const variant = match.match ? 'sideMenuActive' : 'sideMenuNormal'
  const iconAs = match.match && activeIcon ? activeIcon : icon

  return (
    <Link as={RWLink} to={to} variant={variant} {...rest}>
      <Icon as={iconAs} mr={4} />
      {children}
    </Link>
  )
}

export default SideMenuLink
