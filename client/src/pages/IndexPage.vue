<template>
  <div class="q-pa-md">
    <div class="row q-gutter-lg">
      <div v-for="(item, index) in items" :key="index" class="column">
        <q-btn color="accent" class="q-pa-md" :to="item?.to ?? undefined"
          ><q-icon :name="item.icon" size="70px"
        /></q-btn>
        <div class="q-pa-sm text-weight-medium text-center text-uppercase">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    name: 'Customers',
    icon: 'person',
    to: { name: 'admin:users:search' },
  },
  {
    name: 'Courses',
    icon: 'school',
  },
  {
    name: 'Badges',
    icon: 'sym_o_award_star',
    to: { name: 'admin:badge' },
  },
]
</script>
