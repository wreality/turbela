<template>
  <q-btn
    v-show="!show"
    v-model="search"
    no-caps
    flat
    align="left"
    placeholder="Search"
    class="full-width text-left"
    @click="toggleDialog"
  >
    <q-icon name="search" /> Search
  </q-btn>
  <q-dialog v-model="show" position="top" transition-show="fade">
    <q-card flat style="width: 600px">
      <q-card-section class="q-pa-sm">
        <q-input
          v-model="search"
          borderless
          bordered
          dense
          placeholder="Search"
          autofocus
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-linear-progress
          v-show="loading"
          indeterminate
          color="blue"
          size="1px"
          class="full-width absolute-bottom"
        />
      </q-card-section>
      <template v-if="search">
        <q-separator />

        <q-scroll-area
          v-if="users.length"
          ref="scrollArea"
          :style="`max-height: 80vh; height: ${
            users.length * 56 * (search ? 1 : 0)
          }px`"
        >
          <q-list>
            <q-item
              v-for="(user, idx) in users"
              :key="user.id"
              ref="itemRefs"
              :active="active === idx"
              :to="{
                name: 'admin:users:view',
                params: { id: user.id },
              }"
            >
              <q-item-section avatar>
                <UserAvatar :user="user" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ user.name }}
                </q-item-label>
                <q-item-label caption>{{ user.email }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
        <q-item v-else>
          <q-item-section> No user records found. </q-item-section>
        </q-item>
      </template>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { useMagicKeys } from '@vueuse/core'
import { QList, QScrollArea, useQuasar } from 'quasar'
import { GetUsersDocument, User } from 'src/generated/graphql'
import { computed, reactive, ref, toRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import UserAvatar from '../User/UserAvatar.vue'

const scrollArea = ref<QScrollArea | null>(null)
const show = ref(false)
const active = ref<number | null>(null)
const itemRefs = ref<QList[]>([])
function toggleDialog() {
  show.value = !show.value
}

const variables = reactive({
  q: '',
  page: 1,
})
const search = toRef(variables, 'q')

const { result, loading } = useQuery(GetUsersDocument, variables, {
  fetchPolicy: 'cache-and-network',
})

const users = computed(() => {
  return (result.value?.users?.data ?? []) as User[]
})

const { arrowUp, arrowDown, enter } = useMagicKeys()

watch(arrowUp, (v) => {
  if (v) {
    if (active.value === null || active.value === 0) {
      active.value = users.value.length - 1
    } else {
      active.value = active.value - 1
    }
  }
})

watch(arrowDown, (v: boolean) => {
  if (v) {
    if (active.value === null || active.value === users.value.length - 1) {
      active.value = 0
    } else {
      active.value = active.value + 1
    }
  }
})

const { push } = useRouter()
watch(enter, (v: boolean) => {
  if (v) {
    if (active.value !== null) {
      push({
        name: 'admin:users:view',
        params: { id: users.value[active.value].id },
      })
      show.value = false
    }
  }
})

watch(show, (v: boolean) => {
  if (v) {
    active.value = null
    search.value = ''
  }
})

watch(search, () => {
  active.value = null
})

watch(active, (newValue) => {
  if (newValue === null) {
    return
  }

  scrollToView(newValue)
})

//Write a function that returns the scrolls an element into view if it is not already visible
function scrollToView(index: number) {
  const el = itemRefs.value[index].$el
  const elRect = el.getBoundingClientRect()
  const parentRect =
    el.parentElement!.parentElement!.parentElement!.getBoundingClientRect()
  console.log(elRect, parentRect)
  if (elRect.top < parentRect.top || elRect.bottom > parentRect.bottom) {
    scrollArea.value!.setScrollPosition('vertical', elRect.top - parentRect.top)
  }
}

const { dark } = useQuasar()

dark.isActive
</script>

<style lang="scss" scoped>
.q-btn {
  border: 1px solid hsl(211, 67%, 82%);
  border-radius: 5px;
  color: hsl(210, 67%, 82%);
}
.q-item--active {
  background-color: hsl(210, 100%, 94%);
}

label.q-field {
  background: $grey-3;
  border: 1px solid $grey-5;
  padding: 0px 10px;
  border-radius: 5px;
  &.q-field--focused {
    border: 1px solid $primary;
  }
}

body.body--dark {
  label.q-field {
    background: $grey-10;
    border: 1px solid $grey-5;
  }

  .q-item--active {
    background-color: hsl(209, 100%, 15%);
  }
}
</style>
