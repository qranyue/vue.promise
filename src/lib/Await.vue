<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts" generic="T">
import { usePromise } from "./request";

const props = defineProps<{
  promise?: Promise<T>;
}>();

const [result] = usePromise(() => props.promise);
</script>

<template>
  <slot v-if="$slots.loading && result.loading" name="loading"></slot>
  <slot v-else-if="$slots.error && result.error" name="error" :error="result.error"></slot>
  <slot v-else-if="!result.value" name="placeholder"></slot>
  <slot v-else-if="result.value" :value="result.value!"></slot>
</template>
