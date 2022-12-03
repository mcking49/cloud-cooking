/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Flex,
  FlexProps,
  FormLabel,
  Input,
  useCheckbox,
} from '@chakra-ui/react'

import { CheckboxField, Label } from '@redwoodjs/forms'

type Props = {
  name: string
  label: string
  isInvalid: boolean
  checkboxProps: {
    [x: string]: unknown
    onChange: (eventOrValue: unknown) => void
  }
}

const CategoryOption = ({ isInvalid, label, checkboxProps, name }: Props) => {
  const { state, getCheckboxProps, getInputProps, htmlProps } = useCheckbox({
    isInvalid,
    isRequired: true,
    name,
    ...checkboxProps,
  })

  const checkedProps: FlexProps = {
    color: 'white',
    backgroundColor: 'blue.800',
  }

  const unCheckedProps: FlexProps = {
    color: 'blue.800',
    borderColor: 'blue.800',
    backgroundColor: 'white',
  }

  const flexProps = state.isChecked ? checkedProps : unCheckedProps

  return (
    <FormLabel name={name} as={Label} {...htmlProps} margin={0}>
      <Input as={CheckboxField} {...getInputProps()} hidden />
      <Flex
        {...getCheckboxProps()}
        {...flexProps}
        width="full"
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        height={10}
        borderWidth="1px"
        borderRadius={4}
      >
        {label}
      </Flex>
    </FormLabel>
  )
}

export default CategoryOption
