import type { RouteLocationRaw, RouteMeta } from 'vue-router/auto';

declare module 'vue-router' {
  interface RouteMeta {
    auth?: {
      needsAbilities?: string | string[]
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

  return {
    childrenOf: function (route: RouteLocationRaw, slice: number = -1) {
      const resolved = router.resolve(route)
      const children = computed(() => resolved.matched.slice(slice)[0].children)
      return computed(() => {
        return children.value.map((child) => {
          const childRoute = router.resolve(child)
          const { meta, name } = childRoute
          let label: string = name, icon: string | undefined
          const { navigation } = meta as RouteMeta
          if (navigation !== undefined) {
            label = navigation.label || label
            icon = navigation.icon || icon
          }
          icon = icon ?? getRouteIcon(childRoute)
          return {
            name, label, icon,
            to: childRoute
          }
        })
      })

    },
    canAccessRoute: function (route: Parameters<typeof router.resolve>[0]) {
      const { matched } = router.resolve(route)
      const needsAbilities = matched.filter(r => r.meta.auth?.needsAbilities !== undefined).flatMap(r => r.meta.auth?.needsAbilities) as string[]

      if (needsAbilities.length === 0) {
        return true
      }

      return can(needsAbilities)
    }
  }
}
