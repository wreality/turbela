import { pick } from 'lodash'
import {
  ComputedRef,
  Ref,
  computed,
  reactive,
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
type BreadcrumbTags = Record<string, ComputedRef<string> | Ref<string>>
const breadcrumbTags = reactive<BreadcrumbTags>({})

export interface Crumb {
  /**
   * Label for the crumb
   */
  label: ComputedRef<string> | string
  /**
   * Destination for the crumb
   */
  to?: RouteLocationRaw
  /**
   * Icon to add before brumbcrumb elements
   */
  icon?: string
}

function useBreadcrumbTags() {
  function setTag(key: string, value: ComputedRef<string> | Ref<string>): void {
    breadcrumbTags[key] = value
  }

  function getTag(label: string): ComputedRef<string> {
    const matches = label.match(/#[a-z_]+/g)

    return computed(() => {
      let value = label
      if (!matches) {
        return value
      }
      for (const match of matches) {
        const tag = unref(breadcrumbTags[match])
        value = value.replace(match, tag)
      }
      return value
    })
  }

  return { setTag, getTag }
}

export { useBreadcrumbTags }

const crumbs = ref<Crumb[]>([])

export function useCrumbs() {
  const route = useRoute()

  const { getTag } = useBreadcrumbTags()

  watchEffect(() => {
    const params = route.params
    const matched = route.matched
    crumbs.value = matched
      .filter((r) => r.meta.crumb)
      .map((r) => {
        const crumb = reactive<Crumb>({
          to: getTo(r, params),
          label: r.components?.default?.name ?? '',
        })
        const routeCrumb = r.meta.crumb as Crumb | string
        if (typeof routeCrumb === 'string') {
          crumb.label = routeCrumb
        } else {
          Object.assign(crumb, routeCrumb)
        }
        if (crumb.label.includes('#')) {
          crumb.label = (getTag(crumb.label) as unknown as string) ?? ''
        }

        return crumb
      })
  })

  function getTo(
    route: RouteLocationMatched,
    params: RouteParams
  ): RouteLocationRaw {
    const to: any = {}

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
