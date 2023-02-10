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
            },
            children: [
              {
                path: '',
                component: () => import('pages/Admin/UsersSearch.vue'), //T
                meta: {
                  requiresAbility: 'search:User',
                  crumb: { label: 'User Search', icon: 'people' },
                },
              },
              {
                path: 'new',
                name: 'admin:users:create',
                component: () => import('pages/Admin/UserNew.vue'),
                meta: {
                  pageTitle: 'Create New User',
                  requiredAbility: 'create:User',
                  crumb: { label: 'Create User', icon: 'person' },
                },
              },
              {
                name: 'admin:users:view',
                path: ':id',
                component: () => import('pages/Admin/UserView.vue'),
                meta: {
                  requiresAbility: 'view:User',
                  crumb: { label: 'View Account', icon: 'person' },
                },
                props: true,
                children: [
                  {
                    path: 'invoices',
                    name: 'admin:users:invoices',
                    component: () =>
                      import('src/pages/Admin/UserView/InvoicesPanel.vue'),
                    meta: {
                      requiresAbility: 'view:User',
                      crumb: { label: 'Invoices', icon: 'money' },
                    },
                  },
                  {
                    path: 'membership',
                    name: 'admin:users:subscription',
                    component: () =>
                      import('src/pages/Admin/UserView/MembershipPanel.vue'),
                    meta: {
                      requiresAbility: 'view:User',
                      crumb: { label: 'Membership', icon: 'badge' },
                    },
                  },
                  {
                    path: 'photo',
                    name: 'admin:users:photo',
                    component: () =>
                      import('src/pages/Admin/UserView/PhotoPanel.vue'),
                    meta: {
                      requiresAbility: 'update:User',
                      crumb: { label: 'Photo', icon: 'photo_camera' },
                    },
                  },
                ],
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
                path: 'admin',
                name: 'admin:settings:admin',
                component: () =>
                  import('pages/Admin/Settings/AdminSettings.vue'),
                meta: {
                  pageTitle: 'Admin Settings',
                  crumb: {
                    icon: 'admin_panel_settings',
                    label: 'Admin Settings',
                  },
                },
              },

              {
                path: 'payment',
                name: 'admin:settings:payment',
                component: () =>
                  import('pages/Admin/Settings/PaymentSettings.vue'),
                meta: {
                  pageTitle: 'Payment Settings',
                  crumb: {
                    icon: 'credit_card',
                    label: 'Payment Integration',
                  },
                },
              },
              {
                path: 'terminals',
                name: 'admin:settings:terminal',
                component: () =>
                  import('pages/Admin/Settings/TerminalSettings.vue'),
                meta: {
                  pageTitle: 'POS Terminals',
                  crumb: {
                    icon: 'point_of_sale',
                    label: 'Point of Sale',
                  },
                },
                children: [
                  {
                    path: 'register/:slug?',
                    name: 'admin:terminals:register',
                    component: () =>
                      import('pages/Admin/Settings/TerminalRegister.vue'),
                    meta: {
                      pageTitle: 'Register Terminal',
                      crumb: {
                        icon: 'add',
                        label: 'Register',
                      },
                    },
                  },
                ],
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

if (process.env.MODE == 'electron') {
  routes.push({
    path: '/pos/configure',
    component: () => import('pages/Pos/ConfigurePage.vue'),
  })
}

export default routes
