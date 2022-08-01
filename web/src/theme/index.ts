import { extendTheme } from '@chakra-ui/react'

// Foundational style overrides
import Button from './components/Button'
import Form from './components/Form'
import FormLabel from './components/FormLabel'
import Input from './components/Input'
import Text from './components/Text'
import colors from './foundations/colors'
import config from './foundations/config'
import fonts from './foundations/fonts'
import styles from './foundations/styles'

const overrides = {
  colors,
  components: {
    Button,
    Form,
    FormLabel,
    Input,
    Text,
  },
  config,
  fonts,
  styles,
}

export default extendTheme(overrides)
