<script setup lang="ts">
import { shallowRef } from "vue";
import { usePromise } from "./lib";

// const p = new Promise<{ text: string }>((resolve, reject) => setTimeout(() => reject({ k: 0 }), 1000));
const v = shallowRef<Promise<string>>();
const [data] = usePromise(v);
</script>

<template>
  <div>{{ data.loading }}</div>
</template>

<style scoped></style>
