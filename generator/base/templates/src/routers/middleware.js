// TODO - remove this file
import store from '@/store'

const requireAuth = (to, from, next) => {
  const token = store.getters['auth/token']
  const currentUser = store.getters['auth/current_user']

  // Send to Login page if no token exists
  if (!token) {
    next({ path: '/auth/login' })
  // Send to destination if the user has already authenticated
  } else if (currentUser.id) {
    next()
  // User has a token, has not yet authenticated with it
  } else {
    store.dispatch('auth/profile/fetchUserProfile')
    .then(() => { next() })
    .catch(() => {
      next({ path: '/auth/login' })
    })
  }
}

const requireAdmin = (to, from, next) => {
  const currentUser = store.getters['auth/current_user']
  const token = store.getters['auth/token']

  // Send to destination if the user has already authenticated
  if (currentUser.id && currentUser.admin) {
    next()
  // Do nothing if the user is logged in, just not an admin
  } else if (token && currentUser.id) {
    next({ path: from.path })
  // Send to Login page if no token exists
  } else if (!token) {
    next({ path: '/auth/login' })
  } else {
    store.dispatch('auth/profile/fetchUserProfile')
    .then(() => {
      const user = store.getters['auth/current_user']
      if (user.admin) return next()
      return next({ path: from.path })
    })
    .catch(() => {
      next({ path: '/auth/login' })
    })
  }
}

const requireRole = (role) => {
  return function (to, from, next) {
    const currentUser = store.getters['auth/current_user']
    const token = store.getters['auth/token']

    // Send to destination if the user has already authenticated
    if (currentUser.id && (currentUser.role === role || currentUser.admin)) {
      next()
    // Do nothing if the user is logged in, just not an admin
    } else if (token && currentUser.id) {
      next({ path: from.path })
    // Send to Login page if no token exists
    } else if (!token) {
      next({ path: '/auth/login' })
    } else {
      store.dispatch('auth/profile/fetchUserProfile')
      .then(() => {
        const user = store.getters['auth/current_user']
        if (user.role === role) return next()
        return next({ path: from.path })
      })
      .catch(() => {
        next({ path: '/auth/login' })
      })
    }
  }
}

const onlyGuest = (to, from, next) => {
  if (store.getters['auth/token']) {
    next({ path: from.path })
  } else {
    next()
  }
}

export default {
  onlyGuest,
  requireAuth,
  requireRole,
  requireAdmin
}
