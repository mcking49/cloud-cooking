import { Private, Route, Router, Set } from '@redwoodjs/router'

import AuthLayout from './layouts/AuthLayout/AuthLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="login">
        <Route path="/dashboard" page={DashboardPage} name="dashboard" />
      </Private>

      <Set wrap={AuthLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/temp-login" page={TempLoginPage} name="tempLogin" />
        <Route path="/temp-forgot-password" page={TempForgotPasswordPage} name="tempForgotPassword" />
        <Route path="/temp-reset-password" page={TempResetPasswordPage} name="tempResetPassword" />
      </Set>

      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
