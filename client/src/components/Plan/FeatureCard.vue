<template>
  <FeatureCardShell
    :top-class="props.attached ? 'bg-primary text-white' : 'bg-grey-2'"
  >
    <template #header
      >{{ feature.name }}
      <q-chip class="col float-right" size="sm">{{ feature.type }}</q-chip>
    </template>
    <template v-if="hasAmount" #details>
      <div v-if="getInput">
        <FeatureCardInput
          v-model="value"
          @save="save"
          @cancel="cancelAdd"
        ></FeatureCardInput>
      </div>
      <div v-else-if="feature.parameters">
        <q-btn
          class="q-px-sm"
          flat
          size="md"
          :label="`${feature.parameters.amount} Units`"
          aria-label="Edit feature amount"
          icon="edit"
          @click="edit"
        ></q-btn>
      </div>
    </template>
    <template v-if="!props.attached" #actions>
      <q-btn
        v-if="!getInput"
        flat
        :label="$t('featureCard.attach.label')"
        :aria-label="$t('featureCard.attach.aria-label')"
        size="sm"
        @click="attach"
      ></q-btn>
      <div v-else>
        <q-btn flat size="sm" label="Enter value above" disabled></q-btn>
        <q-btn
          flat
          size="sm"
          icon="cancel"
          label="Cancel"
          @click="cancelAdd"
        ></q-btn>
      </div>
    </template>
    <template v-else #actions>
      <q-btn
        flat
        :label="$t('featureCard.detach.label')"
        :aria-label="$t('featureCard.detach.aria-label')"
        size="sm"
        @click="detach"
      ></q-btn>
    </template>
  </FeatureCardShell>
</template>

<script setup lang="ts">
import FeatureCardInput from 'components/_molecules/FeatureCardInput.vue'
import FeatureCardShell from 'components/_molecules/FeatureCardShell.vue'
import type { Feature, FeatureType } from 'src/generated/graphql'
import { computed, ref } from 'vue'

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
