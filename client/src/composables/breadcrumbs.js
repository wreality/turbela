import { reactive } from 'vue'

const breadcrumbTags = reactive({})

export function useBreadcrumbTags() {
  function setTag(key, value) {
    breadcrumbTags[key] = value
  }

  function getTag(key) {
    return breadcrumbTags?.[key] ?? ''
  }

  return { setTag, getTag }
}
