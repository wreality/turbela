import { reactive, toRef } from 'vue'
import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
type BreadcrumbTags = Record<string, string>
const breadcrumbTags = reactive<BreadcrumbTags>({})
type MaybeApolloRef<T = any> = MaybeRef<T> | Readonly<Ref<Readonly<T>>>

export function useBreadcrumbTags() {
  function setTag(key: string, value: MaybeApolloRef<any>): void {
    breadcrumbTags[key] = <string>value
  }

  function getTag(key: string): Ref<string> {
    return toRef(breadcrumbTags, key, '')
  }

  return { setTag, getTag }
}
