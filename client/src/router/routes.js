import LoginPage from 'src/pages/LoginPage.vue'
import ErrorPage403 from 'src/pages/ErrorPage403.vue'
import ErrorPage404 from 'src/pages/ErrorPage404.vue'

import { flatRoutes } from '@dreamonkey/vue-routes-flattener'
import { h } from 'vue'
import { RouterView } from 'vue-router'

const EmptyLayout = h(RouterView)
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
            component: EmptyLayout,
            meta: {
              crumb: { label: 'Settings', icon: 'settings' },
            },
            children: [
              {
                path: '',
                name: 'admin:settings',
                component: () =>
                  import('pages/Admin/Settings/SettingsIndex.vue'),
                meta: {
                  pageTitle: 'Settings',
                },
              },
              {
                path: 'general',
                name: 'admin:settings:general',
                component: () =>
                  import('pages/Admin/Settings/GeneralSettings.vue'),
                meta: {
                  pageTitle: 'General Settings',
                  crumb: { icon: 'tune', label: 'General Settings' },
                },
              },
              {
                path: '/badges',
                component: EmptyLayout,
                meta: {
                  pageTitle: 'Badges',
                  crumb: { icon: 'badge', label: 'Badges' },
                },
                children: [
                  {
                    path: '',
                    name: 'admin:setup:badges',
                    component: () => import('pages/Admin/Settings/Badges.vue'),
                    meta: {
                      pageTitle: 'Badges',
                    },
                  },
                  {
                    path: ':id',
                    name: 'admin:setup:badge:view',
                    component: () =>
                      import('pages/Admin/Settings/BadgeEdit.vue'),
                    props: true,
                    meta: {
                      pageTitle: 'View Badge',
                      crumb: {
                        label: '#badge_name',
                        to: { name: 'admin:setup:badges' },
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  { path: '/error403', name: 'error403', component: ErrorPage403 },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: ErrorPage404,
  },
])

export default routes
