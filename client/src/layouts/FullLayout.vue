<template>
  <q-layout view="hhh LpR lff">
    <AppHeader />
    <q-page-container>
      <transition
        enter-active-class="animate__animated animate__slideInDown"
        leave-active-class="animate__animated animate__slideOutUp"
        :duration="500"
      >
        <AuthRequiredOverlay v-if="!isPending && !isAuthenticated" />
      </transition>
      <template v-if="isAuthenticated">
        <div>
          <q-toolbar v-if="count > 0">
            <bread-crumbs />
          </q-toolbar>
          <q-toolbar v-if="pageTitle" class="page-title">
            <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>
          </q-toolbar>
          <q-resize-observer @resize="onResize" />
          <q-separator />
        </div>
        <q-page :style-fn="styleFn">
          <router-view></router-view>
        </q-page>
      </template>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import 'animate.css'

const { isAuthenticated, isPending } = useAuthentication()

const { pageTitle } = usePageTitle()

useSettings(SettingsKey.Admin)

function usePageTitle() {
  const $route = useRoute()

  const pageTitle = computed(() => {
    const [finalRoute] = $route.matched.slice(-1)
    return (
      finalRoute?.meta?.pageTitle ??
      finalRoute?.components?.default?.name ??
      false
    )
  })

  return { pageTitle }
}

const headerHeight = ref(32)
function onResize({ height }: { height: number }) {
  headerHeight.value = height
}

function styleFn(offset: number) {
  const total = offset + headerHeight.value
  return {
    height: '1px',
    minHeight: total ? `calc(100vh - ${total}px)` : '100vh',
  }
}

const { count } = useCrumbs()
</script>

<style lang="scss">
body.body--light {
  .left-drawer {
    background: $grey-3;
  }
  .q-page-container {
    background: white;
  }
}

body.body--dark {
  .left-drawer {
    background: $grey-10;
  }
}
</style>
