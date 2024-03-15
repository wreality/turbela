import type { AbilityName } from 'src/graphql/user_abilities';
import type { RouteLocationRaw, RouteLocationResolved } from 'vue-router/auto';

declare module 'vue-router' {
  interface RouteMeta {
    auth?: {
      needsAbilities?: AbilityName | AbilityName[]
    }
    navigation?: {
      label: string
      icon?: string
    }
  }
}

export function useNavigation() {
  const router = useRouter()
  const { can } = useCurrentUser()

 function canAccessRoute(route: RouteLocationResolved | RouteLocationRaw) {
    let resolvedRoute: RouteLocationResolved
    if (typeof route === 'string' || !('matched' in route)) {
      resolvedRoute = router.resolve(route)
    } else {
      resolvedRoute = route
    }

    const needsAbilities = resolvedRoute.matched
      .filter(r => typeof r.meta.auth !== 'undefined' && 'needsAbilities' in r.meta.auth)
      .flatMap(r => r.meta.auth?.needsAbilities) as AbilityName[]

    if (needsAbilities.length === 0) {
      return true
    }

    return can(needsAbilities)
  }

  return {
    canAccessRoute,
    childrenOf: function (route: RouteLocationRaw, slice: number = -1) {
      const resolved = router.resolve(route)
      const children = computed(() => resolved.matched.slice(slice)[0].children)
      return computed(() => {
        return children.value
          .map((route) => router.resolve(route))
          .filter((route) => canAccessRoute(route))
          .map((route) => {
            const { meta, name } = route
            return {
              name,
              label: meta.navigation?.label ?? name as string,
              icon: meta.navigation?.icon ?? getRouteIcon(route),
              to: route
            }
          })
      })
    },
  }
}
