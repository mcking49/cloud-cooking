import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react'

import { Form as RWForm, FormProps } from '@redwoodjs/forms'

type Props = Omit<BoxProps, 'onSubmit'> & FormProps<unknown>

const Form: React.FC<Props> = ({ children, ref, ...rest }) => {
  const styles = useStyleConfig('Form')

  return (
    <Box __css={styles} as={RWForm} ref={() => ref} {...rest}>
      {children}
    </Box>
  )
}

export default Form
