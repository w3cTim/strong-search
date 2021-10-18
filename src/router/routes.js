
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: 'sort', component: () => import('pages/Sort.vue') },
      { path: 'about', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/createmenu',
    component: () => import('pages/StrongMenu.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
