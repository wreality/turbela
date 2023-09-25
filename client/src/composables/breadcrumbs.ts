import { pick } from 'lodash'
import {
  ref,
  watchEffect,
} from 'vue'
import { useRouter } from 'vue-router'
import {
  RouteLocationMatched,
  RouteLocationRaw,
  RouteParams,
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
    const params = route.params
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
          to: getTo(r, definition, params),
          label,
        } as Crumb
      })
  })

  function getTo(
    route: RouteLocationMatched,
    crumbDef: CrumbDefinition,
    currentParams: RouteParams
  ): RouteLocationRaw {
    const { path } = Object.assign({}, crumbDef.to, route)
    const name = router.resolve({ path })?.name ?? ''

    if (!name) {
      throw new Error(`No route name found for ${path}.  All routes with crumb must have a name`)
    }

    const matches = path
      .match(/:[a-zA-Z0-9_]+/g)
      ?.map((v: string) => v.slice(1))

    return { name, params: matches ? pick(currentParams, matches) : undefined }
  }

  return { crumbs }
}
