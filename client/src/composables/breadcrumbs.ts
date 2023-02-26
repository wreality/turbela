import type { MaybeRef } from '@vueuse/core'
import { Ref, reactive, ref, toRef, watch } from 'vue'
import {
  RouteLocationMatched,
  RouteLocationRaw,
  RouteParams,
  useRoute,
} from 'vue-router'
type BreadcrumbTags = Record<string, string>
const breadcrumbTags = reactive<BreadcrumbTags>({})
type MaybeApolloRef<T = any> = MaybeRef<T> | Readonly<Ref<Readonly<T>>>

export interface Crumb {
  /**
   * Label for the crumb
   */
  label: MaybeRef<string>
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
  function setTag(key: string, value: MaybeApolloRef<any>): void {
    breadcrumbTags[key] = <string>value
  }

  function getTag(key: string): Ref<string> {
    return toRef(breadcrumbTags, key, '')
  }

  return { setTag, getTag }
}

export { useBreadcrumbTags }

const crumbs = ref<Crumb[]>([])

export function useCrumbs() {
  const route = useRoute()

  const { getTag } = useBreadcrumbTags()

  watch(
    () => [route.params, route.matched],
    (newValues) => {
      type WatchedValues = [RouteParams, RouteLocationMatched[]]
      const [params, matched] = newValues as WatchedValues
      crumbs.value = matched
        .filter((r) => r.meta.crumb)
        .map((r) => {
          const crumb = reactive<Crumb>({
            to: r.name ? { name: r.name, params } : r.path,
            label: r.components?.default?.name ?? '',
          })
          const routeCrumb = r.meta.crumb as Crumb | string
          if (typeof routeCrumb === 'string') {
            crumb.label = routeCrumb
          } else {
            Object.assign(crumb, routeCrumb)
          }
          if ((crumb.label[0] ?? '') == '#') {
            crumb.label = (getTag(crumb.label) as unknown as string) ?? ''
          }

          return crumb
        })
    }
  )
  return { crumbs }
}
