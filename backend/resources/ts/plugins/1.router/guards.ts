import type { Router } from 'vue-router'
import { canNavigate } from '@layouts/plugins/casl'
import { useUIStore } from '@/plugins/ui'

import { useIspValue } from '@/utils/useIspValue'

const { ispValue } = useIspValue()

export const setupGuards = (router: Router) => {
  // Router.beforeEach (router condition check first and then redirect to pages)
  // Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
  router.beforeEach(to => {
  /*  for page loader (before page load it is show) */
    const uiStore = useUIStore()

    uiStore.isLoading = true

    /*
     * If it's a public route, continue navigation. This kind of pages are allowed to visited by login & non-login users. Basically, without any restrictions.
     * Examples of public routes are, 404, under maintenance, etc.
     */
    if (to.meta.public)
      return

    /**
     * Check if user is logged in by checking if token & user data exists in local storage
     */
    const isLoggedIn = !!(useCookie('userData').value && useCookie('accessToken').value)

    /*
      If user is logged in and is trying to access login like page, redirect to home
      else allow visiting the page
      (Don't allow executing further by return statement because next code will check for permissions)
     */
    if (to.meta.unauthenticatedOnly) {
      if (isLoggedIn)
        return '/'
      else
        return undefined
    }

    if (!canNavigate(to) && to.matched.length) {
      const path = to.path
      const queryParam = ispValue.value === true ? '?isp=1' : '' // Use .value to access ref value
      const fullUrl = `${path}${queryParam}`

       
      return isLoggedIn
        ? { name: 'not-authorized' }
        : {
            name: 'authentication-auth1-login1',
            query: {
              ...to.query,
              to: to.fullPath !== '/' ? fullUrl : undefined,
            },
          }
       
    }
  })

  /* for page loader (after page load it will hide) */
  router.afterEach(() => {
    const uiStore = useUIStore()

    uiStore.isLoading = false
  })
}
