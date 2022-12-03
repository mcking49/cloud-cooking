import { FC, PropsWithChildren } from 'react'

import { Flex, FlexProps } from '@chakra-ui/react'

type Props = FlexProps & {
  isSelected: boolean
}

type CategoryFilterProps = PropsWithChildren<Props>

const CategoryFilter: FC<CategoryFilterProps> = ({
  children,
  isSelected,
  ...rest
}) => {
  const selectedProps: FlexProps = {
    color: 'white',
    backgroundColor: 'blue.800',
    fontWeight: 700,
  }

  const unSelectedProps: FlexProps = {
    color: 'blue.800',
    backgroundColor: 'white',
  }

  const flexProps = isSelected ? selectedProps : unSelectedProps
  return (
    <Flex
      {...flexProps}
      width="100px"
      minWidth="100px"
      height="30px"
      textAlign="center"
      justifyContent="center"
      alignItems="center"
      borderRadius={4}
      textTransform="uppercase"
      fontFamily="PT Sans"
      fontSize="11px"
      lineHeight="1.2em"
      cursor="pointer"
      {...rest}
    >
      {children}
    </Flex>
  )
}

export default CategoryFilter
