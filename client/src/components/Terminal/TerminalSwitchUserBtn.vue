<template>
  <q-btn flat @click="onSwitchClick">
    <q-avatar size="30px">
      <q-icon :name="currentUser ? 'switch_account' : 'lock'" />
    </q-avatar>
    <UserAvatar
      v-for="(user, idx) in others"
      :key="`avatar${idx}`"
      :user="user"
      bordered
      size="30px"
      class="inactive-avatar avatar"
    />
    <div v-if="currentUser">
      <UserAvatar class="q-mx-sm" size="40px" :user="currentUser" />
      {{ currentUser?.name }}
    </div>
  </q-btn>
</template>

<script lang="ts" setup>
const { others, token } = useTerminalStore()
const { currentUser } = useCurrentUser()

function onSwitchClick() {
  token.value = null
}
</script>

<style lang="sass" scoped>
.overlapping
  position: absolute

.inactive-avatar
  filter: grayscale(60%)
  opacity: 70%
</style>
