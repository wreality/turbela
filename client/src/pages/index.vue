<template>
  <div class="q-pa-md column q-gutter-lg">
    <div>
      <div class="row q-gutter-lg">
        <app-navigator-item label="Customers" :to="{ name: 'users:search' }" />
        <app-navigator-item label="Badges" :to="{ name: 'badges:index' }" />
        <app-navigator-item
          label="Volunteers"
          :to="{ name: 'volunteers:index' }"
        />
      </div>
    </div>
    <div>
      <q-card>
        <q-card-section>
          Eventually there will be loads of dashboard content here.
        </q-card-section>
      </q-card>
    </div>
    <div>
      <div class="row q-gutter-md">
        <q-card class="col">
          <q-responsive :ratio="2">
            <q-card-section>Widget 1</q-card-section>
          </q-responsive>
        </q-card>

        <q-card class="col">
          <q-card-section>Widget 1</q-card-section>
        </q-card>
        <q-card class="col">
          <q-card-section>Widget 1</q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePage({})
</script>

<style scoped lang="scss">
:deep(.app-navigator-item) {
  width: 50px;
  .q-btn {
    background-color: $accent;
    color: white;
    .q-icon {
      font-size: 2em;
    }
  }
}
</style>
