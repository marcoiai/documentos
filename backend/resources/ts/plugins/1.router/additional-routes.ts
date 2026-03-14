import type { RouteRecordRaw } from 'vue-router/auto'

import { useIspValue } from '@/utils/useIspValue'

const { ispValue } = useIspValue()

const detailRouteComponent = () => import('@/pages/apps/ecommerce/details/index.vue')

// Redirects
export const redirects: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    redirect: to => {
      // Check if the user is authenticated
      const userData = useCookie<Record<string, unknown> | null | undefined>('userData')
      const isLoggedIn = !!userData.value

      // If the user is authenticated, redirect based on their role
      if (isLoggedIn) {
        const userRole = userData.value?.role
        if (userRole === 'admin')
          return { path: ispValue.value === true ? '/dashboards/default?isp=1' : '/dashboards/default' }
        else
          return { path: ispValue.value === true ? '/authentication/auth1/login1?isp=1' : '/authentication/auth1/login1', query: to.query }
      }

      // If the user is not authenticated, redirect to the home page
      return { name: 'landing' }
    },
  },

  // Add other redirects as needed
]

export const routes: RouteRecordRaw[] = [
  // details id
  {
    path: '/apps/ecommerce/details/:id',
    name: 'apps-ecommerce-details-id',
    component: detailRouteComponent,
  },
]
