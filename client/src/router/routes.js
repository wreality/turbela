import LoginPage from 'src/pages/Login.vue'
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
          { path: 'users', component: () => import('pages/Admin/Users.vue') },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
])

export default routes
