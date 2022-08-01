import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react'

import { Form as RWForm, FormProps } from '@redwoodjs/forms'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = Omit<BoxProps, 'onSubmit'> & FormProps<any>

const Form: React.FC<Props> = ({ children, ref, ...rest }) => {
  const styles = useStyleConfig('Form')

  return (
    <Box __css={styles} as={RWForm} ref={() => ref} {...rest}>
      {children}
    </Box>
  )
}

export default Form
