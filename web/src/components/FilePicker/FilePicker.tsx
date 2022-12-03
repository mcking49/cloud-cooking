import { Box } from '@chakra-ui/react'
import { PickerDropPane } from 'filestack-react'

type FilePickMode = 'first_pick' | 'replace'

type Props = {
  accept: HTMLInputElement['accept']
  mode: FilePickMode
  text: string
  onSuccess: (result: unknown) => void
}

const FilePicker = ({ accept, mode, text, onSuccess }: Props) => {
  const isFirstPick = mode === 'first_pick'

  return (
    <Box
      __css={{
        '.fsp-drop-pane__container': {
          backgroundColor: 'white',
          border: 'none',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'gray.100',
          height: isFirstPick ? '100px' : 'initial',
          padding: isFirstPick ? '16px' : '0px',
          width: isFirstPick ? '100%' : 'fit-content',
        },
        '.fsp-drop-pane__text': {
          padding: '4px 24px',
          border: '1px solid',
          borderColor: 'green.400',
          borderRadius: '4px',
          fontSize: '12px',
          color: 'green.400',
        },
      }}
    >
      <PickerDropPane
        apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
        // https://filestack.github.io/filestack-js/interfaces/pickeroptions.html
        pickerOptions={{
          accept,
          concurrency: 1,
          customText: {
            'Drag and Drop, Copy and Paste Files': text,
          },
          dropPane: {
            showIcon: false,
            showProgress: true,
          },
        }}
        onUploadDone={onSuccess}
      />
    </Box>
  )
}

export default FilePicker
