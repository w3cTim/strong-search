
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'options', component: () => import('pages/Index.vue') },
      { path: 'sort', component: () => import('pages/Sort.vue') },
      { path: 'about', component: () => import('pages/About.vue') }
    ]
  },
  // {
  //   path: '/createmenu',
  //   component: () => import('src/pages/About.vue')
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
