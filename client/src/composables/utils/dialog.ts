import type { DialogChainObject } from 'quasar'
import type { Component, MaybeRef } from 'vue'
import type { RouteLocationRaw } from 'vue-router/auto'
import type { ComponentProps } from 'vue-component-type-helpers'


export async function useDialogPage<Dialog extends Component, Props extends ComponentProps<Dialog>['$props']>(component: Dialog, componentProps: MaybeRef<Props>, route: RouteLocationRaw) {
  const dialogChain = ref<DialogChainObject | undefined>()
  const { push } = useRouter()
  const { dialog } = useQuasar()

  watch(() => unref(componentProps), (newValue) => {
    const componentProps = unref(newValue)
    if (!componentProps) {
      dialogChain.value?.hide()
      dialogChain.value = undefined
    } else {
      dialogChain.value = dialog({
        component,
        componentProps,
      }).onDismiss(() => {
        dialogChain.value = undefined
        push(route)
      })
    }
  }, { immediate: true })

  onBeforeRouteLeave(() => {
    dialogChain.value?.hide()
  })
}