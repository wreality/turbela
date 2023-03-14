import ErrorPage403 from 'src/pages/ErrorPage403.vue'
import ErrorPage404 from 'src/pages/ErrorPage404.vue'
import LoginPage from 'src/pages/LoginPage.vue'
import type { RouteRecordRaw } from 'vue-router'

const appRoutes: RouteRecordRaw[] = [
  { path: '', component: () => import('src/pages/IndexPage.vue') },
  { path: 'login', component: LoginPage, meta: { allowGuest: true } },
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
            component: () => import('src/pages/Admin/User/UserSearch.vue'), //T
            meta: {
              requiresAbility: 'search:User',
            },
          },
          {
            path: 'new',
            name: 'admin:users:create',
            component: () => import('src/pages/Admin/User/UserNew.vue'),
            meta: {
              pageTitle: 'Create New User',
              requiredAbility: 'create:User',
              crumb: { label: 'Create User', icon: 'person' },
            },
          },
          {
            name: 'admin:users:view',
            path: ':id',
            component: () => import('src/pages/Admin/User/UserView.vue'),
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
                  import('pages/Admin/User/UserView/InvoicesPanel.vue'),
                meta: {
                  requiresAbility: 'view:User',
                  crumb: { label: 'Invoices', icon: 'money' },
                },
              },
              {
                path: 'membership',
                name: 'admin:users:subscription',
                component: () =>
                  import('pages/Admin/User/UserView/MembershipPanel.vue'),
                meta: {
                  requiresAbility: 'view:User',
                  crumb: { label: 'Membership', icon: 'badge' },
                },
              },
              {
                path: 'photo',
                name: 'admin:users:photo',
                component: () =>
                  import('pages/Admin/User/UserView/PhotoPanel.vue'),
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
        meta: {
          crumb: { label: 'Settings', icon: 'settings' },
        },
        children: [
          {
            path: '',
            name: 'admin:settings',
            component: () => import('pages/Admin/Settings/SettingsIndex.vue'),
            meta: {
              pageTitle: 'Settings',
            },
          },
          {
            path: 'general',
            name: 'admin:settings:general',
            component: () => import('pages/Admin/Settings/GeneralSettings.vue'),
            meta: {
              pageTitle: 'General Settings',
              crumb: { icon: 'tune', label: 'General Settings' },
            },
          },
          {
            path: 'admin',
            name: 'admin:settings:admin',
            component: () => import('pages/Admin/Settings/AdminSettings.vue'),
            meta: {
              pageTitle: 'Admin Settings',
              crumb: {
                icon: 'admin_panel_settings',
                label: 'Admin Settings',
              },
            },
          },
          {
            path: 'overlay',
            meta: {
              crumb: {
                icon: 'image',
                label: 'Image Overlays',
              },
            },
            children: [
              {
                name: 'admin:overlays:index',
                path: '',
                component: () =>
                  import('pages/Admin/Settings/Overlay/OverlayIndex.vue'),
                meta: {
                  pageTitle: 'Image Overlays',
                },
              },
              {
                path: 'create',
                name: 'admin:overlays:create',
                component: () =>
                  import('pages/Admin/Settings/Overlay/OverlayCreate.vue'),
                meta: {
                  pageTitle: 'Create Overlay',
                  crumb: {
                    label: 'Create Overlay',
                  },
                },
              },
              {
                path: ':id',
                name: 'admin:overlays:edit',
                component: () =>
                  import('pages/Admin/Settings/Overlay/OverlayEdit.vue'),
                props: true,
                meta: {
                  pageTitle: 'Edit Overlay',
                  crumb: {
                    label: 'Edit Overlay',
                  },
                },
              },
            ],
          },
          {
            path: 'payment',
            name: 'admin:settings:payment',
            component: () => import('pages/Admin/Settings/PaymentSettings.vue'),
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

            meta: {
              pageTitle: 'POS Terminals',
              crumb: {
                icon: 'point_of_sale',
                label: 'POS Terminals',
                to: { name: 'admin:settings:terminal' },
              },
            },
            children: [
              {
                path: '',
                name: 'admin:settings:terminal',
                component: () =>
                  import('src/pages/Admin/Settings/Terminal/TerminalIndex.vue'),
              },
              {
                path: 'register/:slug?',
                name: 'admin:terminals:register',
                component: () =>
                  import(
                    'src/pages/Admin/Settings/Terminal/TerminalRegister.vue'
                  ),
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
            meta: {
              pageTitle: 'Memberships',
              crumb: {
                icon: 'widgets',
                label: 'Memberships',
                to: { name: 'admin:setup:memberships' },
              },
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
                  import('src/pages/Admin/Settings/Plan/PlanCreate.vue'),
              },
              {
                path: 'edit/:id',
                name: 'admin:memberships:edit',
                meta: {
                  crumb: { label: 'Edit #plan_name' },
                  pageTitle: 'Edit Membership',
                },
                props: true,
                component: () =>
                  import('src/pages/Admin/Settings/Plan/PlanEdit.vue'),
              },
              {
                path: ':id',
                name: 'admin:memberships:view',
                meta: {
                  crumb: { label: '#plan_name' },
                  pageTitle: 'Memberships',
                },
                props: true,
                component: () =>
                  import('src/pages/Admin/Settings/Plan/PlanView.vue'),
              },
              {
                path: '',
                name: 'admin:setup:memberships',
                component: () =>
                  import('src/pages/Admin/Settings/Plan/PlanIndex.vue'),
              },
            ],
          },
          {
            path: 'badges',
            meta: {
              pageTitle: 'Badges',
              crumb: { icon: 'badge', label: 'Badges' },
            },
            children: [
              {
                path: '',
                name: 'admin:setup:badges',
                component: () =>
                  import('src/pages/Admin/Settings/Badge/BadgesPage.vue'),
                meta: {
                  pageTitle: 'Badges',
                },
              },
              {
                path: ':id',
                name: 'admin:setup:badge:view',
                component: () =>
                  import('src/pages/Admin/Settings/Badge/BadgeEdit.vue'),
                props: true,
                meta: {
                  pageTitle: 'View Badge',
                  crumb: {
                    label: '#badge_name',
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
]
let routes: RouteRecordRaw[] = []
if (process.env.MODE == 'electron') {
  appRoutes.push({
    path: '/pos',
    children: [
      {
        path: '/pos/setup',
        name: 'pos:setup',
        component: () => import('pages/Pos/SetupPage.vue'),
        meta: {
          pageTitle: 'Terminal Setup',
        },
      },
    ],
  })
  routes = [
    {
      path: '/',
      component: () => import('layouts/ElectronLayout.vue'),
      children: [
        {
          path: 'register',
          name: 'pos:register',
          component: () => import('src/pages/Pos/RegisterPage.vue'),
        },
        {
          path: '/pos/error',
          name: 'pos:error',
          component: () => import('pages/Pos/ErrorPage.vue'),
        },
        {
          path: '/',
          component: () => import('layouts/PosLayout.vue'),
          children: [...appRoutes],
        },
      ],
    },
  ]
} else {
  routes = [
    {
      path: '/',
      component: () => import('layouts/FullLayout.vue'),
      meta: { crumb: { label: 'Home', icon: 'home' } },
      children: [...appRoutes],
    },
  ]
}

routes.push(
  { path: '/error403', name: 'error403', component: ErrorPage403 },
  {
    path: '/:catchAll(.*)*',
    component: ErrorPage404,
  }
)
export default routes
