<template>
  <q-card class="user cursor-pointer" flat="flat" @click="clickHandler">
    <transition
      appear
      enter-active-class="animated flipInX animate__slow animate__delay-2s"
    >
      <q-card-section
        v-if="showHeader"
        class="q-pa-none absolute"
        style="z-index: 100; width: 100%"
      >
        <slot name="header"></slot>
      </q-card-section>
    </transition>
    <q-card-section class="text-center">
      <!--ID Image-->
      <AvatarImage
        class="q-mb-sm q-mx-auto"
        rounded
        size="100px"
        :user="user"
      />
      <div class="text-bold">{{ user.name }}</div>
      <div class="text-caption ellipsis">{{ user.email }}</div>
    </q-card-section>
    <q-card-section
      v-if="hasSubscriptionProp"
      class="text-center q-pa-sm text-bold"
      :class="membershipBannerClass"
    >
      <span v-if="user.subscription === null"> No Membership </span>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import AvatarImage from 'components/AvatarImage.vue'
import type { User } from 'src/generated/graphql'
import { computed } from 'vue'
interface Props {
  user: User
  showHeader?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showHeader: false,
})

interface Emits {
  (e: 'select', value: User): void
}
const emit = defineEmits<Emits>()

function clickHandler() {
  emit('select', props.user)
}

const hasSubscriptionProp = computed(() =>
  props.user.hasOwnProperty('subscription')
)

const membershipBannerClass = computed(() => {
  if (props.user.subscription === null) {
    return 'bg-grey-1'
  }
  return 'white'
})
</script>
