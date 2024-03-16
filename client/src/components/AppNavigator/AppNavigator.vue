<template>
  <q-menu style="width: 500px">
    <q-card>
      <app-navigator-section label="Quick Actions">
        <app-navigator-item label="New Customer" :to="{ name: 'users:new' }" />
      </app-navigator-section>
      <app-navigator-section>
        <app-navigator-item label="Customers" :to="{ name: 'users:search' }" />
        <app-navigator-item label="Badges" :to="{ name: 'badges:index' }" />
        <app-navigator-item
          label="Volunteers"
          :to="{ name: 'volunteers:index' }"
        />
        <app-navigator-item label="Customers" :to="{ name: 'users:search' }" />
        <app-navigator-item label="Customers" :to="{ name: 'users:search' }" />
      </app-navigator-section>
      <app-navigator-section>
        <app-navigator-item label="Setup" :to="{ name: '/admin' }" />
      </app-navigator-section>
    </q-card>
  </q-menu>
</template>

<script lang="ts" setup>
interface Props {
  pos?: boolean
}

withDefaults(defineProps<Props>(), {
  pos: false,
})
</script>

<style scoped lang="scss">
.app-navigator-section {
  :deep(.app-navigator-item) {
    width: calc(100% / 6);
    .q-btn {
      background-color: $secondary;
      color: white;
    }
    .q-icon {
      font-size: 4em;
    }
  }
}
</style>
