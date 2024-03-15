<template>
  <div></div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
graphql(`
query PunchedInVolunteers(page: Int, first: Int = 25) {
  volunteers(page: $page, first: $first) {
    paginatorInfo {
      currentPage
      total
    }
    data {
      id
      name
      email
      volunteer {
        current_hour {
          start
        }
      }
    }
  }
}
`)
</script>
<style scoped></style>
