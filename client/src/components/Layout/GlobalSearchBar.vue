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
      <q-card-section class="q-pa-sm q-pb-lg">
        <q-input
          v-model="search"
          borderless
          bordered
          dense
          placeholder="Search"
          autofocus
          hint="Start typing to search globally for users, badges, transactions. etc."
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

      <q-separator />

      <q-scroll-area
        v-if="searchResults.length"
        ref="scrollArea"
        :style="`max-height: 80vh; height: ${search ? searchHeight : 0}px`"
      >
        <q-list>
          <q-resize-observer @resize="onListResize" />
          <q-item
            v-for="(searchResult, idx) in searchResults"
            :key="idx"
            ref="itemRefs"
            :active="active === idx"
            clickable
            @click="onItemSelect(searchResult)"
          >
            <template v-if="searchResult.__typename === 'User'">
              <q-item-section avatar>
                <UserAvatar :user="searchResult" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ searchResult.name }}
                </q-item-label>
                <q-item-label caption>{{ searchResult.email }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>User</q-item-label>
              </q-item-section>
            </template>
            <template v-else-if="searchResult.__typename === 'Badge'">
              <q-item-section avatar>
                <q-icon name="school" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ searchResult.name }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>Badge</q-item-label>
              </q-item-section>
            </template>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-item v-else>
        <q-item-section> No records found. </q-item-section>
      </q-item>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { useMagicKeys } from '@vueuse/core'
import { QItem, QList, QScrollArea, useQuasar } from 'quasar'
import { GlobalSearchDocument, SearchModel } from 'src/generated/graphql'
import { computed, reactive, ref, toRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import UserAvatar from '../User/UserAvatar.vue'

const scrollArea = ref<QScrollArea | null>(null)
const show = ref(false)
const itemRefs = ref<QItem[] | null>(null)

const active = ref<number | null>(null)

function toggleDialog() {
  show.value = !show.value
}

const variables = reactive({
  q: '',
})
const search = toRef(variables, 'q')

const { result, loading } = useQuery(GlobalSearchDocument, variables, {
  fetchPolicy: 'cache-and-network',
})

const searchResults = computed(() => {
  return (result.value?.search?.data ?? []) as SearchModel[]
})

const { arrowUp, arrowDown, enter } = useMagicKeys()

const searchHeight = ref(0)
function onListResize(size: any) {
  searchHeight.value = size.height
}
watch(arrowUp, (v) => {
  if (v) {
    if (active.value === null || active.value === 0) {
      active.value = searchResults.value.length - 1
    } else {
      active.value = active.value - 1
    }
    scrollToView(active.value, false)
  }
})

watch(arrowDown, (v: boolean) => {
  if (v) {
    if (
      active.value === null ||
      active.value === searchResults.value.length - 1
    ) {
      active.value = 0
    } else {
      active.value = active.value + 1
    }
    scrollToView(active.value, true)
  }
})

watch(enter, (v: boolean) => {
  if (v) {
    if (active.value !== null) {
      onItemSelect(searchResults.value[active.value])
    }
  }
})

const { push } = useRouter()
function onItemSelect(searchResult: SearchModel) {
  if (searchResult.__typename === 'User') {
    push({
      name: 'admin:users:view',
      params: { id: searchResult.id },
    })
  } else if (searchResult.__typename === 'Badge') {
    push({
      name: 'admin:badge:view',
      params: { id: searchResult.id },
    })
  }
  show.value = false
}

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
})

//What does this function do?

function scrollToView(index: number, down: boolean) {
  if (!itemRefs.value || !scrollArea.value) {
    return
  }

  const el = itemRefs.value[index].$el as HTMLDivElement

  const setScroll = scrollArea.value.setScrollPosition

  const scroll = scrollArea.value.getScroll()
  const scrollTop = scroll.verticalPosition
  const scrollBottom = scroll.verticalPosition + scroll.verticalContainerSize

  const elTop = el.offsetTop
  const elBottom = el.offsetTop + el.clientHeight

  if (elBottom > scrollBottom) {
    if (down) {
      setScroll('vertical', elBottom - scroll.verticalContainerSize)
    } else {
      setScroll('vertical', scroll.verticalSize - scroll.verticalContainerSize)
    }
  }
  if (elTop < scrollTop) {
    if (down) {
      scrollArea.value.setScrollPosition('vertical', 0)
    } else {
      scrollArea.value.setScrollPosition('vertical', elTop)
    }
  }
}

const { dark } = useQuasar()

dark.isActive
</script>

<script lang="ts">
import { gql } from 'graphql-tag'

gql`
  query GlobalSearch($q: String!) {
    search(q: $q) {
      data {
        ... on User {
          id
          email
          name
        }
        ... on Badge {
          id
          name
        }
      }
    }
  }
`
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
