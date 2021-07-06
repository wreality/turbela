import { SessionStorage } from 'quasar'
import { currentUserGQL } from 'src/graphql/queries'

async function userField(apolloClient, field) {
  return await apolloClient
    .query({
      query: currentUserGQL,
    })
    .then(({ data: { currentUser } }) => currentUser?.[field] || null)
}

function loginRedirect(to, next) {
  SessionStorage.set('loginRedirect', to.fullPath)
  next('/login')
}

export async function beforeEachRequiresAuth(apolloClient, to, _, next) {
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
export async function beforeEachRequiresAbility(apolloClient, to, _, next) {
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

export async function beforeEachRequiresRole(apolloClient, to, _, next) {
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
