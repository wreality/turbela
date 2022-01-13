<template lang="pug">
router-view.q-pa-md(v-slot='{ Component }')
  keep-alive(include='UsersSearch')
    component(:is='Component')
</template>
