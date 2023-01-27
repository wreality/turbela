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
      { path: '', component: () => import('src/pages/IndexPage.vue') },
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
                path: 'memberships',
                name: 'admin:setup:memberships',
                component: () =>
                  import('src/pages/Admin/Settings/PlansPage.vue'),
                meta: {
                  pageTitle: 'Memberships',
                  crumb: { icon: 'widgets', label: 'Memberships' },
                },
                children: [
                  {
                    path: 'new',
                    name: 'admin:setup:memberships:new',
                    meta: {
                      crumb: { label: 'New Membership' },
                      pageTitle: 'New Membership',
                    },
                    component: () =>
                      import('pages/Admin/Settings/PlanEdit.vue'),
                  },
                  {
                    path: ':id',
                    name: 'admin:setup:memberships:view',
                    meta: {
                      crumb: { label: '#plan_name' },
                      pageTitle: 'Memberships',
                    },
                    props: true,
                    component: () =>
                      import('pages/Admin/Settings/PlanView.vue'),
                  },
                  {
                    path: ':id/edit',
                    name: 'admin:setup:memberships:edit',
                    meta: {
                      crumb: { label: 'Edit #plan_name' },
                      pageTitle: 'Edit Membership',
                    },
                    props: true,
                    component: () =>
                      import('pages/Admin/Settings/PlanEdit.vue'),
                  },
                ],
              },
              {
                path: 'badges',
                component: EmptyLayout,
                meta: {
                  pageTitle: 'Badges',
                  crumb: { icon: 'badge', label: 'Badges' },
                },
                children: [
                  {
                    path: '',
                    name: 'admin:setup:badges',
                    component: () =>
                      import('src/pages/Admin/Settings/BadgesPage.vue'),
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
