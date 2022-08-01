import { MetaTags } from '@redwoodjs/web'

import LoginForm from 'src/components/LoginForm/LoginForm'

const LoginPage = () => {
  return (
    <>
      <MetaTags title="Login" description="Login page" />

      <LoginForm />
    </>
  )
}

export default LoginPage
