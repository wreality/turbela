import { SessionStorage } from 'quasar'
import {LoggedInUserDocument} from 'src/gql/graphql'
import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'
import { ResultOf } from '@graphql-typed-document-node/core'
import { defaultClient } from 'src/apollo/apollo-client'

type UserKeys = keyof NonNullable<ResultOf<typeof LoggedInUserDocument>['currentUser']>

async function userField(field: UserKeys) {
  return await defaultClient
    .query({
      query: LoggedInUserDocument,
      fetchPolicy: 'cache-first',
    })
    .then(({ data: { currentUser } }) => currentUser?.[field] || null)
}

function loginRedirect(to: RouteLocationNormalized, next: NavigationGuardNext) {
  SessionStorage.set('loginRedirect', to.fullPath)
  next()
}

export async function beforeEachAllowGuest(
  to: RouteLocationNormalized,
  _: any,
  next: NavigationGuardNext
) {
  if (to.meta.allowGuest) {
    next()
  } else {
    if (! await userField('id')) {
      loginRedirect(to, next)
    } else {
      next()
    }
  }
}
export async function beforeEachRequiresAbility(
  to: RouteLocationNormalized,
  _: any,
  next: NavigationGuardNext
) {
  if (to.matched.some((record) => record.meta.requiresAbility)) {
    const abilities = await userField('abilities') as string[]
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
  to: RouteLocationNormalized,
  _: any,
  next: NavigationGuardNext
) {
  if (to.matched.some((record) => record.meta.requiresRole)) {
    const roles = await userField('roles') as string[]

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

export function setupRouterGuards(router: Router) {
  router.beforeEach(beforeEachAllowGuest)
  router.beforeEach(beforeEachRequiresAbility)
  router.beforeEach(beforeEachRequiresRole)
}
