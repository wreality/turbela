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

<script>
import { defineComponent } from 'vue'
import AvatarImage from 'components/AvatarImage.vue'

export default defineComponent({
  name: 'UserCard',
  components: { AvatarImage },
  props: {
    user: {
      type: Object,
      required: true,
    },
    showHeader: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    function clickHandler() {
      emit('select', props.user)
    }
    return { clickHandler }
  },
})
</script>

<style lang="scss" scoped></style>
