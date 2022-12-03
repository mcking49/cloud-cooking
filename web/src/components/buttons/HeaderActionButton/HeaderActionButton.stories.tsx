import { IoMdClose } from 'react-icons/io'

import HeaderActionButton from './HeaderActionButton'

export const generated = () => {
  return (
    <HeaderActionButton leftIcon={<IoMdClose />}>Button</HeaderActionButton>
  )
}

export default { title: 'Components/HeaderActionButton' }
