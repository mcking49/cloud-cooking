import { ComponentStyleConfig, CSSObject } from '@chakra-ui/react'

const sideMenuNormal: CSSObject = {
  color: 'blue.800',
  display: 'inline-flex',
  alignItems: 'center',
  fontFamily: 'PT Sans',
  fontSize: '16px',
  fontWeight: 400,
  height: '52px',
  letterSpacing: '0.04em',
  lineHeight: '1.2em',
  padding: '16px 44px',
  textTransform: 'uppercase',
  width: 'full',
}

const sideMenuActive: CSSObject = {
  ...sideMenuNormal,
  background: 'white',
  fontWeight: 700,
  letterSpacing: '0.08em',
  shadow: 'navMenu',
  width: 'calc(100% + 4px)',
}

const Link: ComponentStyleConfig = {
  variants: {
    sideMenuActive,
    sideMenuNormal,
  },
}

export default Link
