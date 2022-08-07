import { extendTheme } from '@chakra-ui/react'

// Foundational style overrides
import Button from './components/Button'
import Form from './components/Form'
import FormLabel from './components/FormLabel'
import Heading from './components/Heading'
import Input from './components/Input'
import Link from './components/Link'
import Text from './components/Text'
import colors from './foundations/colors'
import config from './foundations/config'
import fonts from './foundations/fonts'
import shadows from './foundations/shadows'
import styles from './foundations/styles'

const overrides = {
  colors,
  components: {
    Button,
    Form,
    FormLabel,
    Heading,
    Input,
    Link,
    Text,
  },
  config,
  fonts,
  shadows,
  styles,
}

export default extendTheme(overrides)
