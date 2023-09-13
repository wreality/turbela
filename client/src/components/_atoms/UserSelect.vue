<template>
  <VeeSelect
    ref="veeSelectRef"
    input-debounce="200"
    use-input
    :options="options"
    option-value="id"
    option-label="name"
    :name="name"
    @filter="badgeFilterFn"
    @update:model-value="veeSelectRef?.selectRef?.updateInputValue('')"
  >
    <template #prepend><q-icon name="person" /></template>
    <template #option="{ opt, itemProps }">
      <q-item v-bind="itemProps">
        <q-item-section avatar>
          <UserAvatar :user="opt" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ opt.name }}</q-item-label>
          <q-item-label caption>{{ opt.email }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
    <template #selected-item="scope">
      <q-chip
        removable
        :tabindex="scope.tabindex"
        color="grey-3"
        text-color="secondary"
        class="q-ma-xs"
        @remove="scope.removeAtIndex(scope.index)"
      >
        {{ scope.opt.name }}
      </q-chip>
    </template>
    <template #no-option="{ inputValue }">
      <q-item v-if="inputValue.length > 1 && !loading">
        <q-item-section>
          <q-item-label>No users found</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </VeeSelect>
</template>

<script setup lang="ts">
import VeeSelect from './VeeSelect.vue'
import { useApolloClient } from '@vue/apollo-composable'
import { User, SelectUsersDocument } from 'src/gql/graphql'
import { ref } from 'vue'
import UserAvatar from '../User/UserAvatar.vue'
import { DocumentNode } from 'graphql'
import { graphql } from 'src/gql'

interface Props {
  name: string
  query?: DocumentNode
  variables?: Record<string, any> | object
}
const props = withDefaults(defineProps<Props>(), {
  query: undefined,
  variables: () => ({}),
})
const veeSelectRef = ref<InstanceType<typeof VeeSelect>>()
const options = ref<Pick<User, 'id' | 'name' | 'email'>[]>([])

const { resolveClient } = useApolloClient()
const client = resolveClient()
const loading = ref(false)

async function badgeFilterFn(val: string, update: (x: () => void) => void) {
  if (val.length < 1) {
    update(() => (options.value = []))
    loading.value = false
    return
  }
  loading.value = true
  const result = await client.query({
    query: props.query ?? SelectUsersDocument,
    variables: {
      search: val,
      input: {
        ...props.variables,
      },
      page: 1,
    },
  })
  loading.value = false
  const key = Object.keys(result.data)[0]
  update(() => (options.value = result.data[key].data))
}
</script>

<script lang="ts">
graphql(`
  query SelectUsers($page: Int, $search: String, $input: SearchUsersInput) {
    users(first: 24, page: $page, input: $input, search: $search) {
      paginatorInfo {
        lastPage
        total
      }
      data {
        id
        name
        email
        ...UserItem
      }
    }
  }
`)
</script>
