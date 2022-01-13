import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { SessionStorage } from 'quasar'
import { CURRENT_USER } from 'src/graphql/queries'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
type Client = ApolloClient<NormalizedCacheObject>

async function userField(apolloClient: Client, field: string) {
  return await apolloClient
    .query({
      query: CURRENT_USER,
    })
    .then(({ data: { currentUser } }) => currentUser?.[field] || null)
}

function loginRedirect(to: RouteLocationNormalized, next: NavigationGuardNext) {
  SessionStorage.set('loginRedirect', to.fullPath)
  next('/login')
}

export async function beforeEachRequiresAuth(
  apolloClient: Client,
  to: RouteLocationNormalized,
  _: any,
  next: NavigationGuardNext
) {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!userField(apolloClient, 'id')) {
      loginRedirect(to, next)
    } else {
      next()
    }
  } else {
    next()
  }
}
export async function beforeEachRequiresAbility(
  apolloClient: Client,
  to: RouteLocationNormalized,
  _: any,
  next: NavigationGuardNext
) {
  if (to.matched.some((record) => record.meta.requiresAbility)) {
    const abilities = await userField(apolloClient, 'abilities')
    if (!abilities) {
      loginRedirect(to, next)
    } else {
      const requiredAbilities = to.matched
        .filter((record) => record.meta.requiresAbility)
        .map((record) => record.meta.requiresAbility)
        .flat(2)

      const hasAbility = requiredAbilities
        .map((ability) => abilities.includes(ability))
        .every((ability) => ability === true)

      if (!hasAbility) {
        next({ name: 'error403' })
      } else {
        next()
      }
    }
  } else {
    next()
  }
}

export async function beforeEachRequiresRole(
  apolloClient: Client,
  to: RouteLocationNormalized,
  _: any,
  next: NavigationGuardNext
) {
  if (to.matched.some((record) => record.meta.requiresRole)) {
    const roles = await userField(apolloClient, 'roles')

    if (!roles) {
      loginRedirect(to, next)
    } else {
      const requiredRoles = to.matched
        .filter((record) => record.meta.requiresRole)
        .map((record) => record.meta.requiresRole)
        .flat(2)

      const hasRoles = requiredRoles
        .map((role) => roles.includes(role))
        .every((role) => role === true)

      if (!hasRoles) {
        next({ name: 'error403' })
      } else {
        next()
      }
    }
  } else {
    next()
  }
}
