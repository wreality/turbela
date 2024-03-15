<template>
  <q-page class="" :style-fn="styleFn">
    <div class="flex items-center justify-center wrapper">
      <q-card flat class="q-pa-md">
        <q-card-section class="items-center justify-center column">
          <q-icon size="70px" color="red-8" name="lock" class="q-pa-md" />

          <div class="text-h5">LMN Admin Portal</div>
        </q-card-section>
        <q-card-section
          class="column items-center justify-center"
          style="max-width: 300px"
        ></q-card-section>
        <q-card-section class="column items-center">
          <q-btn class="q-px-lg" icon="lock" color="primary" @click="doLogin">
            {{ $t('Login') }}
          </q-btn>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
const { login } = useAuthentication()

const doLogin = () => {
  login()
}

function styleFn(offset: number) {
  return {
    height: `calc(100vh - ${offset}px)`,
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: $grey-3;
  height: 100%;
}
</style>
