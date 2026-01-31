import HomePage from '@pages/HomePage.vue'
import GamesPage from '@pages/GamesPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@layouts/MainLayout.vue'
import NotFoundPage from '@pages/NotFoundPage.vue'
import ContactPage from '@pages/ContactPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomePage,
          meta: { title: 'ImpStructors Web | Home' }
        },
        {
          path: 'games',
          name: 'games',
          component: GamesPage,
          meta: { title: 'ImpStructors Web | Our Games' }
        },
        {
          path: 'about-us',
          name: 'about-us',
          meta: { title: 'ImpStructors Web | About Us' },
          component: import('@pages/About_UsPage.vue')
        },
        {
          path: 'contact',
          name: 'contact',
          meta: { title: 'ImpStructors Web | Contact Us' },
          component: () => ContactPage
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          meta: { title: 'ImpStructors Web | Not Found' },
          component: () => NotFoundPage,
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Page',
    next()
})

export default router
