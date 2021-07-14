<template lang="pug">
div
  .q-mb-md
    q-btn(label='Back to search', to='/admin/users')
  .flex.justify-left(v-if='user')
    user-card(:user='user')
</template>

<script>
import { defineComponent } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { USER_VIEW } from 'src/graphql/queries'
import UserCard from 'components/UserCard.vue'

export default defineComponent({
  name: 'UserView',
  components: { UserCard },
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { result } = useQuery(USER_VIEW, { email: props.email })
    const user = useResult(result, null, (data) => data.user)

    return { user }
  },
})
</script>

<style lang="scss" scoped></style>
