<script setup lang="ts">
import { AwaitPromise } from './lib'

const p = new Promise<string>((resolve) => setTimeout(() => resolve('done'), 1000))
</script>

<template>
  <AwaitPromise :promise="p">
    <template #loading>Loading...</template>
    <template #default="{ value }">
      {{ value }}
    </template>
  </AwaitPromise>
</template>

<style scoped></style>
