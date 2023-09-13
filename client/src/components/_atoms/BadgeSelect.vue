<template>
  <VeeSelect
    input-debounce="200"
    use-input
    emit-value
    :options="options"
    option-value="id"
    option-label="name"
    :name="name"
    @filter="badgeFilterFn"
  >
    <template #prepend><q-icon name="sym_o_award_star" /></template>
    <template #selected-item="{ opt }">
      {{ options.find((v) => v.id == opt)?.name }}
    </template>
  </VeeSelect>
</template>

<script setup lang="ts">
import { ResultOf } from '@graphql-typed-document-node/core'
import VeeSelect from './VeeSelect.vue'
import { useApolloClient } from '@vue/apollo-composable'
import { GetBadgesDocument } from 'src/gql/graphql'
import { ref } from 'vue'

interface Props {
  name: string
}

defineProps<Props>()

const options = ref<ResultOf<typeof GetBadgesDocument>['badges']['data']>([])

const { resolveClient } = useApolloClient()
const client = resolveClient()

async function badgeFilterFn(val: string, update: (x: () => void) => void) {
  const result = await client.query({
    query: GetBadgesDocument,
    variables: {
      search: val,
      page: 1,
    },
  })

  update(() => (options.value = result.data.badges.data))
}
</script>
