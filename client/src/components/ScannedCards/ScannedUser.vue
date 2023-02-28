<template>
  <div class="column full-height justify-between">
    <q-card-section horizontal class="">
      <user-image :user="card" width="200px" />
      <q-card-section class="text-h5">
        {{ card.name }}
      </q-card-section>
    </q-card-section>
    <div class="">
      <div class="row justify-evenly">
        <q-btn class="" size="xl" color="primary">View Account</q-btn>
        <q-btn class="" size="xl" color="primary">Check In</q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from 'src/generated/graphql'
import UserImage from '../molecules/UserImage.vue'

interface Props {
  card: User
}
defineProps<Props>()
</script>

<style scoped></style>
