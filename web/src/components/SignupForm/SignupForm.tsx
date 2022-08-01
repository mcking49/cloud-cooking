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
  useBreakpointValue,
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
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { Link as RWLink, navigate, routes } from '@redwoodjs/router'

import Form from '../Form'
import Logo from '../Logo'

interface SignupFormValues {
  firstName: string
  lastName: string
  password: string
  username: string
}

const signupFieldNames: readonly (keyof SignupFormValues)[] = [
  'firstName',
  'lastName',
  'password',
  'username',
]

const SignupForm = () => {
  const { isAuthenticated, loading, signUp } = useAuth()
  const NameStack = useBreakpointValue({ base: VStack, lg: HStack })
  const toast = useToast()

  const formMethods = useForm<SignupFormValues>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    try {
      const response = await signUp(data)
      if (response.error) {
        throw response
      } else {
        navigate(routes.dashboard())

        toast({
          description: 'Account created!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      if (error.error && signupFieldNames.includes(error.error)) {
        formMethods.setError(error.error, {
          message: 'This field is required',
        })
      } else {
        toast({
          title: 'Something went wrong',
          description: error.error || error.message || null,
          status: 'error',
          isClosable: true,
        })
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(routes.dashboard())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* Heading section below md */}
      <Hide above="md">
        <Heading as="h1" size="xl" fontWeight="normal">
          Create an account
        </Heading>
      </Hide>

      {/* Heading section above md */}
      <Show above="md">
        <HStack>
          <Heading as="h1" fontFamily="fonts.body" fontWeight={600}>
            Welcome to
          </Heading>

          <Logo fontSize={{ base: '36px', xl: '44px' }} />
        </HStack>
      </Show>

      {/* Signup Form */}
      <Form onSubmit={onSubmit} formMethods={formMethods} mt={6}>
        <VStack spacing={4}>
          <NameStack spacing={4} width="full">
            <FormControl isInvalid={!!formMethods.formState.errors.firstName}>
              <FormLabel as={Label} name="firstName">
                First Name
              </FormLabel>

              <Input
                as={TextField}
                name="firstName"
                validation={{
                  required: {
                    value: true,
                    message: 'Please enter your first name',
                  },
                }}
              />

              <FormErrorMessage as={FieldError} name="firstName">
                First name is required.
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formMethods.formState.errors.lastName}>
              <FormLabel as={Label} name="lastName">
                Last Name
              </FormLabel>

              <Input
                as={TextField}
                name="lastName"
                validation={{
                  required: {
                    value: true,
                    message: 'Please enter your last name',
                  },
                }}
              />

              <FormErrorMessage as={FieldError} name="lastName">
                Last name is required.
              </FormErrorMessage>
            </FormControl>
          </NameStack>

          <FormControl isInvalid={!!formMethods.formState.errors.username}>
            <FormLabel as={Label} name="username">
              Email Address
            </FormLabel>

            <Input
              as={EmailField}
              name="username"
              autoComplete="username"
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
              autoComplete="new-password"
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

          <Text variant="hint">
            By signing up I accept the terms of use and the data privacy policy.
          </Text>

          <Box>
            <Button
              type="submit"
              colorScheme="green"
              width={{ base: '200px', sm: '240px' }}
              mt={4}
            >
              Create Account
            </Button>
          </Box>

          <HStack>
            <Text>Already have an account?</Text>
            <Link
              as={RWLink}
              to={routes.login()}
              _hover={{ color: 'green.400' }}
              textDecoration="underline"
            >
              Sign in
            </Link>
          </HStack>
        </VStack>
      </Form>
    </>
  )
}

export default SignupForm
