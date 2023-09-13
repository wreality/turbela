<template>
  <q-img
    style="background: url('/id_placeholder.png')"
    :sizes="sizes"
    :srcset="srcset"
    :src="url"
    alt="User Avatar"
    @load="onLoad"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { graphql } from 'src/gql'
import { ResultOf } from '@graphql-typed-document-node/core'

const Fragment = graphql(`
  fragment UserImage on User {
    avatar {
      srcset
      url
    }
  }
`)

interface Props {
  user: ResultOf<typeof Fragment>
}

const props = defineProps<Props>()

const url = computed(() => props.user?.avatar?.url ?? '')
const srcset = computed(() =>
  props.user?.avatar?.srcset ? props.user.avatar.srcset : ''
)

const loaded = ref(false)

function onLoad() {
  loaded.value = true
}

const sizes = computed(() => {
  if (!loaded.value) {
    return '1px'
  }

  return '(max-width: 1200px) 60vw, 720px'
})
</script>

<style lang="css"></style>
