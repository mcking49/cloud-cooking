import { Route, Router, Set } from '@redwoodjs/router'

import AuthLayout from './layouts/AuthLayout/AuthLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={AuthLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/temp-login" page={TempLoginPage} name="tempLogin" />
        <Route path="/temp-signup" page={TempSignupPage} name="tempSignup" />
        <Route path="/temp-forgot-password" page={TempForgotPasswordPage} name="tempForgotPassword" />
        <Route path="/temp-reset-password" page={TempResetPasswordPage} name="tempResetPassword" />
      </Set>

      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
