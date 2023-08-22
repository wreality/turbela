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
    <template #selected-item="{ opt }">
      {{ options.find((v) => v.id == opt)?.name }}
    </template>
    <template #no-option="{ inputValue }">
      <q-item v-if="inputValue.length < 3">
        <q-item-section>
          <q-item-label
            >Type at least 3 characters to search users</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-item v-else>
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
import { User, GetUsersDocument } from 'src/generated/graphql'
import { ref } from 'vue'
import UserAvatar from '../User/UserAvatar.vue'

interface Props {
  name: string
}

defineProps<Props>()

const options = ref<Pick<User, 'id' | 'name' | 'email'>[]>([])

const { resolveClient } = useApolloClient()
const client = resolveClient()

async function badgeFilterFn(val: string, update: (x: () => void) => void) {
  if (val.length < 0) {
    update(() => (options.value = []))
    return
  }
  const result = await client.query({
    query: GetUsersDocument,
    variables: {
      q: val,
      page: 1,
    },
  })

  update(() => (options.value = result.data.users.data))
}
</script>
