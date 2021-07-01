import LoginPage from 'src/pages/Login.vue';

const routes = [
  {
    path: '/',
    component: () => import('layouts/FullLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: LoginPage }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
