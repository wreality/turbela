import {
  ref,
  watchEffect,
} from 'vue'
import { useRouter } from 'vue-router'
import {
  RouteLocationRaw,
  useRoute,
} from 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    crumb?: CallableCrumb | CrumbDefinition
    pageTitle?: string
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
  to: RouteLocationRaw
  /**
   * Icon to add before brumbcrumb elements
   */
  icon?: string
}
export type CallableCrumb = (scope: object) => CrumbDefinition
export type CrumbDefinition = {
    label: string | ((scope: any) => string)
    icon?: string
    to?: RouteLocationRaw
}
export type BreadcrumbScope = Record<string, string>
const scope = ref<BreadcrumbScope>({})

export function useScope() {
  function set(value: object) {
    scope.value = { ...scope.value, ...value }
    return scope.value
  }
  function get(value: string) {
    return (s: BreadcrumbScope ) => s[value] ?? ''
  }
  return {
    scope,
    set,
    get
  }
}

function unwrapValue<T>(value: T | ((scope: BreadcrumbScope) => T)): T
{
  return value instanceof Function ? value(scope.value) : value
}

const crumbs = ref<Crumb[]>([])

export function useCrumbs() {
  const route = useRoute()
  const router = useRouter()


  watchEffect(() => {
    const matched = route.matched
    crumbs.value = matched
      .filter((r) => r.meta.crumb)
      .map<Crumb>((r) => {
        const definition = unwrapValue(r.meta.crumb)
        if (!definition) {
          throw new Error('No crumb definition found')
        }
        const label = unwrapValue(definition.label ?? r.components?.default?.name ?? '')

        return {
          ...definition,
          to: router.resolve(definition.to || { name: r.name }),
          label,
        } as Crumb
      })
  })

  return { crumbs }
}
