<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts" generic="T">
import { usePromise } from "./request";

const props = defineProps<{
  promise?: Promise<T>;
}>();

const [result] = usePromise(() => props.promise);
</script>

<template>
  <slot v-if="result.loading" name="loading"></slot>
  <slot v-else-if="result.error" name="error" :error="result.error"></slot>
  <slot v-else :value="result.value!"></slot>
</template>
