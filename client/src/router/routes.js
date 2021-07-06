import LoginPage from 'src/pages/Login.vue'
import Error403 from 'src/pages/Error403.vue'
import Error404 from 'src/pages/Error404.vue'

import { flatRoutes } from '@dreamonkey/vue-routes-flattener'

const routes = flatRoutes([
  {
    path: '/',
    component: () => import('layouts/FullLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: LoginPage },
      {
        path: 'admin',
        children: [
          {
            path: 'users',
            component: () => import('pages/Admin/Users.vue'),
            meta: { requiresAbility: 'search:User' },
          },
          {
            name: 'admin:users:view',
            path: 'users/:email',
            component: () => import('pages/Admin/UserView.vue'),
            meta: { requiresAbility: 'view:User' },
            props: true,
          },
        ],
      },
    ],
  },
  { path: '/error403', name: 'error403', component: Error403 },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: Error404,
  },
])

export default routes
