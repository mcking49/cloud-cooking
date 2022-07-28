import { extendTheme } from '@chakra-ui/react'

// Foundational style overrides
import Form from './components/Form'
import colors from './foundations/colors'
import config from './foundations/config'
import fonts from './foundations/fonts'
import styles from './foundations/styles'

const overrides = {
  colors,
  components: {
    Form,
  },
  config,
  fonts,
  styles,
}

export default extendTheme(overrides)
