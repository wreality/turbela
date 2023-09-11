import { pick } from 'lodash'
import {
  computed,
  ref,
  unref,
  watchEffect,
} from 'vue'
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

const crumbs = ref<Crumb[]>([])

export function useCrumbs() {
  const route = useRoute()


  watchEffect(() => {
    const params = route.params
    const matched = route.matched
    crumbs.value = matched
      .filter((r) => r.meta.crumb)
      .map<Crumb>((r) => {
        const definition =
          r.meta.crumb instanceof Function ?
            r.meta.crumb(scope) :
            r.meta.crumb
        if (!definition) {
          throw new Error('No crumb definition found')
        }
        const label =
         definition.label instanceof Function ?
            definition.label(scope.value) :
            definition.label ??
            r.components?.default?.name ??
            ''
        const crumb = {
          to: getTo(r, definition, params),
          label,
          icon: definition.icon
        }
        return crumb as Crumb
      })
  })

  function getTo(
    route: RouteLocationMatched,
    crumbDef: CrumbDefinition,
    params: RouteParams
  ): RouteLocationRaw {
    const to: any = crumbDef.to ?? {}


    if (route.name) {
      to.name = route.name
      const matches = route.path
        .match(/:[a-zA-Z0-9_]+/g)
        ?.map((v) => v.slice(1))
      if (matches) {
        to.params = pick(params, matches)
      }
    } else {
      to.path = route.path
    }

    return to
  }
  return { crumbs }
}
