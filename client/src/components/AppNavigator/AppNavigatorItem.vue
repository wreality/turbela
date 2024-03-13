<template>
  <div v-if="canAccess" :class="$attrs?.['class']" class="app-navigator-item">
    <q-responsive :ratio="1 / 1">
      <q-btn
        v-bind="restAttrs"
        :class="$attrs?.['btnClass']"
        :to="props.to"
        class="flex flex-center q-pa-xs"
        flat
      >
        <div class="col">
          <q-icon class="fit" :name="iconName" />
        </div>
      </q-btn>
    </q-responsive>
    <div class="text-center navigator-item-label">{{ props.label }}</div>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { omit } from 'lodash'
import type { AppIconName } from 'src/composables/utils'
import type { RouteLocationRaw } from 'vue-router/auto'
interface Props {
  to: RouteLocationRaw
  icon?: string
  label: string
  btnClass?: string
  appIcon?: AppIconName
}
const props = defineProps<Props>()
const $attrs = useAttrs()

const restAttrs = computed(() => omit($attrs, ['class']))

const { canAccessRoute } = useNavigation()
const canAccess = computed(() => canAccessRoute(props.to))

const iconName = computed(
  () => getAppIcon(props.appIcon) ?? getRouteIcon(props.to) ?? props.icon
)
</script>

<style scoped lang="scss">
.app-navigator-item {
  .q-icon {
    font-size: 3em;
  }
  .navigator-item-label {
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.81em;
  }
}
</style>
app/appIcons
