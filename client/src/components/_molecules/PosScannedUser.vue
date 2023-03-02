<template>
  <q-item-section avatar>
    <div class="row justify-center items-center">
      <UserAvatar :user="card.lookup?.target as User" />
    </div>
  </q-item-section>
  <q-item-section>
    <q-item-label> {{ card.lookup?.target?.name }}</q-item-label>
    <q-item-label caption>
      {{ card.lookup?.target?.email }}
    </q-item-label>
    <q-item-label caption>
      <div class="float-right">
        <slot name="when" />
      </div>
    </q-item-label>
  </q-item-section>
</template>

<script lang="ts" setup>
import { ScannedCard } from 'src/composables/terminal'
import { User } from 'src/generated/graphql'
import UserAvatar from '../User/UserAvatar.vue'

interface Props {
  card: ScannedCard
}
defineProps<Props>()
</script>
