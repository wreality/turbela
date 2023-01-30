<template lang="pug">
FeatureCardShell(
  :topClass='props.attached ? "bg-primary text-white" : "bg-grey-2"'
)
  template(#header) {{ feature.name }}
    q-chip.col.float-right(size='sm') {{ feature.type }}
  template(#details, v-if='hasAmount')
    div(v-if='getInput')
      FeatureCardInput(v-model='value', @save='save', @cancel='cancelAdd')
    div(v-else-if='feature.parameters')
      q-btn.q-px-sm(
        flat,
        size='md',
        :label='`${feature.parameters.amount} Units`',
        aria-label='Edit feature amount',
        @click='edit',
        icon='edit'
      )
  template(#actions, v-if='!props.attached')
    q-btn(
      flat,
      :label='$t("featureCard.attach.label")',
      :aria-label='$t("featureCard.attach.aria-label")',
      @click='attach',
      size='sm',
      v-if='!getInput'
    )
    div(v-else)
      q-btn(flat, size='sm', label='Enter value above', disabled)
      q-btn(flat, size='sm', icon='cancel', label='Cancel', @click='cancelAdd')
  template(#actions, v-else)
    q-btn(
      flat,
      @click='detach',
      :label='$t("featureCard.detach.label")',
      :aria-label='$t("featureCard.detach.aria-label")',
      size='sm'
    )
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import FeatureCardShell from './molecules/FeatureCardShell.vue'
import FeatureCardInput from './molecules/FeatureCardInput.vue'
import type { Feature, FeatureType } from 'src/generated/graphql'

interface Props {
  feature: Pick<Feature, 'id' | 'type' | 'parameters' | 'name'>
  attached?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  attached: false,
  matches: () => [],
})

interface Emits {
  (e: 'updateParam', feature: Pick<Feature, 'id'>, value: number): void
  (e: 'detach', value: Feature['id']): void
}

const emit = defineEmits<Emits>()

const value = ref('')
const getInput = ref(false)

function edit() {
  const currentValue = props.feature?.parameters?.amount
  if (typeof currentValue === 'number') {
    getInput.value = true
    value.value = currentValue.toString()
  }
}
function save() {
  emit('updateParam', props.feature, parseInt(value.value))
  value.value = ''
  getInput.value = false
}

function detach() {
  emit('detach', props.feature.id)
}

function attach() {
  if (hasAmount.value) {
    getInput.value = true
    value.value = ''
  } else {
    save()
  }
}

function cancelAdd() {
  value.value = ''
  getInput.value = false
}

const hasAmount = computed(() => {
  return ['LIMIT'].includes(<FeatureType>props.feature.type)
})
</script>

<style lang="scss">
.high {
  background: yellow;
  color: black;
}
</style>
