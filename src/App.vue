<script setup lang="ts">
import { Await } from "./lib";

const p = new Promise<string>((resolve) => setTimeout(() => resolve("done"), 1000));
</script>

<template>
  <Await :promise="p">
    <template #loading>Loading...</template>
    <template #default="{ value }">
      {{ value }}
    </template>
  </Await>
</template>

<style scoped></style>
