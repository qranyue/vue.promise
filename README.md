# 使用方式

## Await

### 基本使用

```html
<script setup lang="ts">
  import axios from "axios";
  import { Await } from "qrany-vue-promise";

  const promise = axios.get("");
</script>

<template>
  <Await :promise="promise">
    <template #loading>loading...</template>
    <template #error="{ error }">{{ error }}</template>
    <template #default="{ value }">
      <div v-if="value">有</div>
      <div v-else>无</div>
    </template>
  </Await>
</template>
```

### 页面更新

```html
<script setup lang="ts">
  import axios from "axios";
  import { Await } from "qrany-vue-promise";
  import { shallowRef } from "vue";

  const promise = shallowRef<Promise<unknown>>();
</script>

<template>
  <Await :promise="promise">
    <template #loading>
      <button disabled>提交中</button>
    </template>
    <template #default>
      <button @click="promise = axios.get('')">提交</button>
    </template>
  </Await>
</template>
```

## usePromise

### 基本使用

```html
<script setup lang="ts">
  import axios from "axios";
  import { usePromise } from "qrany-vue-promise";

  const getData = () => axios.get("");
  const [data] = usePromise(getData);
</script>

<template>
  <template v-if="data.loading">loading...</template>
  <template v-else-if="data.error">{{ data.error }}</template>
  <template v-else>{{ data.value }}</template>
</template>
```

### 页面更新

```html
<script setup lang="ts">
  import axios from "axios";
  import { usePromise } from "qrany-vue-promise";
  import { shallowReactive } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();
  const form = shallowReactive<{ type?: string }>({});
  const getData = () => axios.get("", { params: { id: route.query.id, type: form.type } });

  const [data] = usePromise(getData);
</script>

<template>
  <template v-if="data.loading">loading...</template>
  <template v-else-if="data.error">{{ data.error }}</template>
  <template v-else>{{ data.value }}</template>
</template>
```

### 表单提交

```html
<script setup lang="ts">
  import axios from "axios";
  import { usePromise } from "qrany-vue-promise";
  import { shallowRef } from "vue";
  import { useRoute } from "vue-router";

  // 方式1
  const [save, dispatch] = usePromise();
  const onSave = () => dispatch(axios.post(""));

  // 方式2
  const promise = shallowRef<Promise<unknown>>();
  const [save] = usePromise(promise);
  const onSave = () => (promise.value = axios.post(""));
</script>

<template>
  <button :disabled="save.loading" @click="onSave">
    <template v-if="save.loading">提交中...</template>
    <template v-else>提交</template>
  </button>
</template>
```
