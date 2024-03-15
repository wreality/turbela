<template>
  <q-layout
    view="hHH LpR lff"
    style="margin-top: 32px; min-height: calc(100vh - 32px)"
  >
    <PosHeader style="margin-top: 32px" />

    <q-drawer
      v-if="currentUser"
      elevated
      :model-value="true"
      persistent
      side="left"
      style="margin-top: 32px; height: calc(100% - 32px) !important"
      :width="120"
    >
      <AppNavigator pos />
    </q-drawer>
    <!-- <q-drawer
      :model-value="false"
      bordered
      side="right"
      class="bg-grey-10 q-pa-sm"
      style="margin-top: 32px; height: calc(100% - 32px) !important"
      :width="430"
    >
      <div class="column text-white q-gutter-md">
        <div class="text-h4 text-white text-center">Cart</div>
        <q-list>
          <q-item dense>
            <q-item-section> 3/4 Panel </q-item-section>
            <q-item-section class="text-white" side> $12.99 </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section> 3/4 Panel </q-item-section>
            <q-item-section class="text-white" side> $12.99 </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section> 3/4 Panel </q-item-section>
            <q-item-section class="text-white" side> $12.99 </q-item-section>
          </q-item>
          <q-separator color="white" />
          <q-item>
            <q-item-section class="text-uppercase text-bold"
              >Total</q-item-section
            >
            <q-item-section class="text-bold text-white" side>
              $12.99
            </q-item-section>
          </q-item>
        </q-list>
        <div class="q-pa-md">
          <div class="row q-gutter-sm">
            <q-btn size="xl" color="primary">Card</q-btn>
            <q-btn size="xl" color="primary">Check</q-btn>
            <q-btn size="xl" color="primary">Cash</q-btn>
          </div>
        </div>
      </div>
    </q-drawer> -->

    <q-page-container v-if="currentUser" style="min-height: calc(100vh - 82px)">
      <q-scroll-area style="height: calc(100vh - 82px)">
        <q-toolbar v-if="pageTitle" class="">
          <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>
        </q-toolbar>
        <q-toolbar v-if="crumbs.length" class="bordered">
          <bread-crumbs />
        </q-toolbar>
        <q-separator />
        <router-view />
      </q-scroll-area>
    </q-page-container>
    <q-page-container
      v-else
      class="locked flex flex-center"
      style="min-height: calc(100vh - 32px)"
    >
      <PosLogin />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
const { currentUser } = useCurrentUser()
const { crumbs } = useCrumbs()
const { matched } = useRoute()
const pageTitle = computed(() => {
  const route = matched.at(-1)

  return route?.meta.pageTitle ?? false
})
</script>

<style lang="scss" scoped>
body.body--light {
  .q-page-container {
    background: white;
    .q-toolbar {
      background: $grey-2;
    }
  }
  .q-page-container.locked {
    background: $blue-grey-5;
  }
}

body.body--dark {
  .q-page-container.locked {
    background: $blue-grey-10;
  }
}
</style>
