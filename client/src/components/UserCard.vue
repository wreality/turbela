<template lang="pug">
q-card.user.cursor-pointer(@click='clickHandler')
  transition(
    appear,
    enter-active-class='animated flipInX animate__slow animate__delay-2s'
  )
    q-card-section.q-pa-none.absolute(
      v-if='showHeader',
      style='z-index: 100; width: 100%'
    )
      slot(name='header')
  q-card-section.text-center
    //ID Image
    avatar-image.q-mb-sm.q-mx-auto(square, rounded, size='100px', :user='user')
    .text-bold {{ user.name }}
    .text-caption.ellipsis {{ user.email }}
  q-card-section.text-center.q-pa-sm.text-bold.bg-positive Current
</template>

<script lang="ts" setup>
import AvatarImage from 'components/AvatarImage.vue'
import type { User } from 'src/generated/graphql'
type PickedUser = Pick<User, 'name' | 'email' | 'id'>
interface Props {
  user: PickedUser
  showHeader: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showHeader: false,
})

interface Emits {
  (e: 'select', value: PickedUser): void
}
const emit = defineEmits<Emits>()

function clickHandler() {
  emit('select', props.user)
}
</script>
