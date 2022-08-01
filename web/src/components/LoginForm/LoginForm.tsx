import { useEffect } from 'react'

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Hide,
  HStack,
  Input,
  Link,
  Show,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import {
  EmailField,
  FieldError,
  Label,
  PasswordField,
  SubmitHandler,
  useForm,
} from '@redwoodjs/forms'
import { Link as RWLink, navigate, routes } from '@redwoodjs/router'

import Form from '../Form'
import Logo from '../Logo'

interface LoginFormValues {
  password: string
  username: string
}

const LOGIN_FIELD_NAMES: readonly (keyof LoginFormValues)[] = [
  'password',
  'username',
]

const LoginForm = () => {
  const { isAuthenticated, logIn } = useAuth()
  const toast = useToast()

  const formMethods = useForm<LoginFormValues>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const response = await logIn(data)
      if (response.error) {
        throw response
      } else {
        navigate(routes.dashboard())

        toast({
          description: 'Welcome back!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      if (error.error && LOGIN_FIELD_NAMES.includes(error.error)) {
        formMethods.setError(error.error, {
          message: 'This field is required',
        })
      } else {
        toast({
          title: 'Login failed',
          description:
            error.error ||
            error.message ||
            'Something went wrong. Please try again later.',
          status: 'error',
          isClosable: true,
        })
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.dashboard())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* Heading section below md */}
      <Hide above="md">
        <Heading as="h1" size="xl" fontWeight="normal">
          Login
        </Heading>
      </Hide>

      {/* Heading section above md */}
      <Show above="md">
        <HStack>
          <Heading as="h1" fontFamily="fonts.body" fontWeight={600}>
            Login to
          </Heading>

          <Logo fontSize={{ base: '36px', xl: '44px' }} />
        </HStack>
      </Show>

      {/* Login Form */}
      <Form onSubmit={onSubmit} formMethods={formMethods} mt={6}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!formMethods.formState.errors.username}>
            <FormLabel as={Label} name="username">
              Email Address
            </FormLabel>

            <Input
              as={EmailField}
              name="username"
              validation={{
                required: {
                  value: true,
                  message: 'Please enter your email',
                },
                pattern: {
                  value: /^[^@]+@[^.]+\..+$/,
                  message: 'Please enter a valid email address',
                },
              }}
            />

            <FormErrorMessage as={FieldError} name="username">
              Email is required.
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!formMethods.formState.errors.password}>
            <FormLabel as={Label} name="password">
              Password
            </FormLabel>

            <Input
              as={PasswordField}
              name="password"
              validation={{
                required: {
                  value: true,
                  message: 'Please enter a password',
                },
              }}
            />

            <FormErrorMessage as={FieldError} name="password">
              Password is required.
            </FormErrorMessage>
          </FormControl>

          <Box>
            <Button
              type="submit"
              colorScheme="green"
              width={{ base: '200px', sm: '240px' }}
              mt={4}
            >
              Sign in
            </Button>
          </Box>

          <HStack>
            <Text>Don&apos;t have a login?</Text>
            <Link
              as={RWLink}
              to={routes.signup()}
              _hover={{ color: 'green.400' }}
              textDecoration="underline"
            >
              Create an account
            </Link>
          </HStack>
        </VStack>
      </Form>
    </>
  )
}

export default LoginForm
