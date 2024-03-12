import { MaybeRef } from 'vue'
import type {  RouteLocationRaw, RouteLocationResolved } from 'vue-router/auto'
import { RouteNamedMap } from 'vue-router/auto-routes'
declare module 'vue-router' {
  interface RouteMeta {
    crumb?: Crumb
  }
}

export type Crumb = {
  /**
   * Label for the crumb
   */
  label: string
  /**
   * Destination for the crumb
   */
  to?: RouteLocationRaw
  /**
   * Icon to add before brumbcrumb elements
   */
  icon?: string
}

export type BreadcrumbRuntime = Partial<Record<keyof RouteNamedMap, string | undefined>>

export type ResolvedCrumb = {
  label: Ref<string>
  to: RouteLocationResolved
  icon?: string
}

const scope = reactive<BreadcrumbRuntime>({})

const crumbs = shallowRef<ResolvedCrumb[]>([])

export function setCrumbLabel(name: keyof RouteNamedMap, value: MaybeRef<string | undefined>) {
  // typing to string as reactive unreffing doens't appear in the typescript types
  // @see https://vuejs.org/guide/essentials/reactivity-fundamentals.html#ref-unwrapping-as-reactive-object-property
    scope[name] = toRef(value) as unknown as string
}
export function useCrumbs() {
  const route = useRoute()
  const router = useRouter()


  watchEffect(() => {
    const matched = route.matched
    crumbs.value = (matched
      .filter((r) => r.meta.crumb)
      .map<ResolvedCrumb>((r) => {
        const definition = r.meta.crumb as Crumb
        const dest = definition.to ?? { name: r.name }
        const to = router.resolve(dest as RouteLocationRaw)
        const label = computed(() => scope[to.name] ?? definition.label ?? to.name)
        return {
          ...definition,
          to,
          label,
        }
      }))
  })

  return { crumbs }
}
