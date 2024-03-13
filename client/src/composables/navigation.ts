import type { RouteLocationRaw, RouteMeta } from 'vue-router/auto';

declare module 'vue-router' {
  interface RouteMeta {
    navigation?: {
      label: string
      icon?: string
    }
  }
}

export function useNavigation() {
  const router = useRouter()

  return {
    childrenOf: function (route: RouteLocationRaw, slice: number = -2) {
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

    }
  }
}
