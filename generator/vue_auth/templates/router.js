// Auth Containers
import Login from './pages/login'
import Register from './pages/register'
import ForgotPassword from './pages/forgot_password'
import ResetPassword from './pages/reset_password'
import Middleware from '@/routers/middleware'

const LoginRoute = {
  path: '/auth/login',
  component: Login,
  beforeEnter: Middleware.onlyGuest
}

const RegisterRoute = {
  path: '/auth/register',
  component: Register,
  beforeEnter: Middleware.onlyGuest
}

const ForgotPasswordRoute = {
  path: '/auth/forgot_password',
  component: ForgotPassword,
  beforeEnter: Middleware.onlyGuest
}

const ResetPasswordRoute = {
  path: '/auth/reset_password',
  component: ResetPassword,
  beforeEnter: Middleware.onlyGuest
}

export default [
  LoginRoute,
  RegisterRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute
]
