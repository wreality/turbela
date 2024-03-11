import { computed } from 'vue';
import { useRouter } from 'vue-router/auto';
import { RouteNamedMap } from 'vue-router/auto-routes';

import { RouteMeta } from 'vue-router/auto';

export function useNavigation() {
  const router = useRouter()

  return {
    childrenOf: function<T extends keyof RouteNamedMap> (name: T, slice: number = -2) {
      const route = router.resolve(name);
      const children = computed(() => route.matched.slice(slice)[0].children)
      return computed(() => {
        return children.value.map((child) => {
          const childRoute = router.resolve(child)
          const { meta, name } = childRoute
          let label: string = name, icon: string = ''
          const { navigation } = meta as RouteMeta
          if (navigation !== undefined) {
            label = navigation.label || label
            icon = navigation.icon || icon
          }
          return {
            name, label, icon,
            to: childRoute
          }
        })
      })

    }
  }
}
