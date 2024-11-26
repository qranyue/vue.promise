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
    <template #placeholder>无返回时的占位</template>
    <template #default="{ value }"></template>
  </Await>

  <Await :promise="promise">
    <template #error="{ error }">{{ error }}</template>
    <template #placeholder>Loading...</template>
    <template #default="{ value }"></template>
  </Await>

  <Await :promise="promise">
    <template #placeholder>无返回时的占位</template>
    <template #default="{ value }"></template>
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
  const onSave = () => (promise.value = axios.post(""));
</script>

<template>
  <Await :promise="promise">
    <template #loading>
      <button disabled>提交中</button>
    </template>
    <template #default>
      <button @click="onSave">提交</button>
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
  <template v-else-if="data.value">{{ data.value }}</template>
  <template v-else>无返回</template>
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
  <template v-else-if="data.value">{{ data.value }}</template>
  <template v-else>无返回</template>
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

# API

## Await

### 属性

| 属性名  | 类型                 | 默认值 | 说明           |
| ------- | -------------------- | ------ | -------------- |
| promise | `Promise<T> \| void` | -      | 请求的 Promise |

### 插槽

| 插槽名      | 说明             | 参数                 |
| ----------- | ---------------- | -------------------- |
| default     | 请求成功后的内容 | `{ value: T }`       |
| placeholder | 无返回时的占位   | -                    |
| loading     | 请求中的内容     | -                    |
| error       | 请求失败的内容   | `{ error: unknown }` |

## usePromise

### 参数

| 属性名       | 类型                              | 默认值 | 说明           |
| ------------ | --------------------------------- | ------ | -------------- |
| promise      | `WatchSource<Promise<T> \| void>` | -      | 请求的 Promise |
| defaultValue | `T`                               | -      | 默认值         |

### 返回值

#### [Data]

| 属性名  | 类型      | 默认值  | 说明     |
| ------- | --------- | ------- | -------- |
| loading | `boolean` | `false` | 请求中   |
| error   | `unknown` | -       | 请求失败 |
| value   | `T`       | -       | 请求成功 |

#### [ ,Dispatch]

##### 参数

| 属性名  | 类型         | 默认值 | 说明           |
| ------- | ------------ | ------ | -------------- |
| promise | `Promise<T>` | -      | 请求的 Promise |

##### 返回值

| 类型            | 默认值 | 说明     |
| --------------- | ------ | -------- |
| `Promise<void>` | -      | 等待异步 |
