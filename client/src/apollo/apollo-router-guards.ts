import { type ApolloClient, NormalizedCacheObject } from '@apollo/client/core'
import { SessionStorage } from 'quasar'
import {LoggedInUserDocument} from 'src/gql/graphql'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { ResultOf } from '@graphql-typed-document-node/core'
type Client = ApolloClient<NormalizedCacheObject>
type UserKeys = keyof NonNullable<ResultOf<typeof LoggedInUserDocument>['currentUser']>
async function userField(apolloClient: Client, field: UserKeys) {
  return await apolloClient
    .query({
      query: LoggedInUserDocument,
    })
    .then(({ data: { currentUser } }) => currentUser?.[field] || null)
}

function loginRedirect(to: RouteLocationNormalized, next: NavigationGuardNext) {
  SessionStorage.set('loginRedirect', to.fullPath)
  next('/login')
}

export async function beforeEachAllowGuest(
  apolloClient: Client,
  to: RouteLocationNormalized,
  _: any,
  next: NavigationGuardNext
) {
  if (to.meta.allowGuest) {
    next()
  } else {
    if (! await userField(apolloClient, 'id')) {
      loginRedirect(to, next)
    } else {
      next()
    }
  }
}
export async function beforeEachRequiresAbility(
  apolloClient: Client,
  to: RouteLocationNormalized,
  _: any,
  next: NavigationGuardNext
) {
  if (to.matched.some((record) => record.meta.requiresAbility)) {
    const abilities = await userField(apolloClient, 'abilities') as string[]
    if (!abilities) {
      loginRedirect(to, next)
    } else {

      if (abilities.includes('*:*')) {
        next()
        return
      }
      const requiredAbilities = to.matched
        .filter((record) => record.meta.requiresAbility)
        .map((record) => record.meta.requiresAbility)
        .flat(2) as string[]

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
    const roles = await userField(apolloClient, 'roles') as string[]

    if (!roles) {
      loginRedirect(to, next)
    } else {
      const requiredRoles = to.matched
        .filter((record) => record.meta.requiresRole)
        .map((record) => record.meta.requiresRole)
        .flat(2) as string[]
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
