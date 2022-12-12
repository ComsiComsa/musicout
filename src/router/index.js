import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      redirect: 'main',
      meta: {
        requiredAuth: true
      },
      children: [
        {
          path: 'main',
          name: 'main',
          component: () => import('@/views/Main.vue')
        }
      ]
    },
    {
      path: '/',
      component: () => import('@/layouts/AuthLayout.vue'),
      meta: {
        requiredAuth: false
      },
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/Login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/Register.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()

  if (!userStore.user.uid && to.meta.requiredAuth) {
    return { name: 'login' }
  }

  if (userStore.user.uid && !to.meta.requiredAuth) {
    return false
  }

  return true
})

export default router
