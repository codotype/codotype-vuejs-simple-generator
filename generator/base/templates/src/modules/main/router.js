// Main Containers
import Home from './pages/home'
import Settings from './pages/settings'

const HomeRoute = {
  path: '/',
  component: Home
}

const SettingsRoute = {
  path: '/settings',
  component: Settings
}

export default [
  HomeRoute,
  SettingsRoute
]
