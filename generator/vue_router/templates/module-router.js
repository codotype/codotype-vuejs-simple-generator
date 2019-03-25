// <%= schema.class_name %> Containers
import <%= schema.class_name %>List from './pages/list'
import <%= schema.class_name %>New from './pages/new'
import <%= schema.class_name %>Show from './pages/show'
import <%= schema.class_name %>Edit from './pages/edit'
import Middleware from '@/routers/middleware'

const <%= schema.class_name %>ListRoute = {
  path: '/<%= schema.identifier_plural %>',
  component: <%= schema.class_name %>List,
  // beforeEnter: Middleware.requireAuth
}

const <%= schema.class_name %>NewRoute = {
  path: '/<%= schema.identifier_plural %>/new',
  component: <%= schema.class_name %>New,
  // beforeEnter: Middleware.requireAuth
}

const <%= schema.class_name %>ShowRoute = {
  path: '/<%= schema.identifier_plural %>/:id',
  component: <%= schema.class_name %>Show,
  props: true,
  // beforeEnter: Middleware.requireAuth
  // beforeEnter: Middleware.requireRole('MENTOR')
}

const <%= schema.class_name %>EditRoute = {
  path: '/<%= schema.identifier_plural %>/:id/edit',
  component: <%= schema.class_name %>Edit,
  props: true,
  // beforeEnter: Middleware.requireAuth
}

export default [
  <%= schema.class_name %>ListRoute,
  <%= schema.class_name %>NewRoute,
  <%= schema.class_name %>ShowRoute,
  <%= schema.class_name %>EditRoute
]
