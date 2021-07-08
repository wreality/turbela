import LoginPage from 'src/pages/Login.vue'
import Error403 from 'src/pages/Error403.vue'
import Error404 from 'src/pages/Error404.vue'

import { flatRoutes } from '@dreamonkey/vue-routes-flattener'

const routes = flatRoutes([
  {
    path: '/',
    component: () => import('layouts/FullLayout.vue'),
    meta: { crumb: { label: 'Home', icon: 'home' } },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: LoginPage },
      {
        path: 'admin',
        children: [
          {
            path: 'users',
            component: () => import('layouts/UsersLayout.vue'), //T
            meta: {
              requiresAbility: 'search:User',
              crumb: { label: 'User Search', icon: 'people' },
            },
            children: [
              {
                path: '',
                component: () => import('pages/Admin/UsersSearch.vue'), //T
                meta: {
                  requiresAbility: 'search:User',
                },
              },
              {
                name: 'admin:users:view',
                path: 'users/:email',
                component: () => import('pages/Admin/UserView.vue'),
                meta: {
                  requiresAbility: 'view:User',
                  crumb: { label: 'View Account', icon: 'person' },
                },
                props: true,
              },
            ],
          },
          {
            path: 'settings',
            name: 'admin:settings',
            component: () => import('pages/Admin/Settings/SettingsIndex.vue'),
            meta: {
              crumb: { label: 'Settings', icon: 'settings' },
            },
            children: [
              {
                path: 'general',
                name: 'admin:settings:general',
                component: () =>
                  import('pages/Admin/Settings/GeneralSettings.vue'),
                meta: { crumb: { icon: 'tune', label: 'General Settings' } },
              },
            ],
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
