import { create } from '@storybook/theming'

import colors from '../../src/theme/foundations/colors'
import fonts from '../../src/theme/foundations/fonts'

const theme = create({
  base: 'light',
  brandTitle: 'Cloud Cooking Storybook',
  brandUrl: 'https://www.cloudcooking.co.nz',
  colorPrimary: colors.blue[800],
  colorSecondary: colors.green[400],
  textColor: colors.blue[800],
  fontBase: fonts.body,
})

export default theme
