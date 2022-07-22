// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/temp-login" page={TempLoginPage} name="tempLogin" />
      <Route path="/temp-signup" page={TempSignupPage} name="tempSignup" />
      <Route path="/temp-forgot-password" page={TempForgotPasswordPage} name="tempForgotPassword" />
      <Route path="/temp-reset-password" page={TempResetPasswordPage} name="tempResetPassword" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
