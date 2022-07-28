import { Img, useBreakpointValue } from '@chakra-ui/react'

import splash from './splash.png'
import splashMobile from './splashMobile.png'
import splashTablet from './splashTablet.png'

const Splash = () => {
  const splashImg = useBreakpointValue<string>({
    base: splashMobile,
    md: splashTablet,
    '2xl': splash,
  })

  return (
    <Img
      src={splashImg}
      width="full"
      height="full"
      alt="Cloud Cooking Splash"
      objectFit="cover"
      objectPosition={{ base: 'top', md: 'unset', '2xl': 'right' }}
    />
  )
}

export default Splash
