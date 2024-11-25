import { shallowReactive, watch, type ShallowReactive, type WatchSource } from "vue";

/** 异步值 */
interface Result<T> {
  /** 异步返回参 */
  value?: T;
  /** 错误 */
  error?: Error;
  /** 加载中 */
  loading: boolean;
}

/** 异步请求 */
interface Dispatch<T> {
  (promise?: Promise<T>): Promise<void> | undefined;
}

export const usePromise = <T>(service?: WatchSource<Promise<T> | undefined>, defaultValue?: T) => {
  const data = shallowReactive<Result<T>>({ loading: false, value: defaultValue });

  const dispatch: Dispatch<T> = (promise) => {
    if (!promise) return;
    data.loading = true;
    data.error = void 0;

    return promise
      .then((res) => {
        data.value = res;
      })
      .catch((err) => {
        data.error = err;
      })
      .finally(() => {
        data.loading = false;
      });
  };

  if (service) watch(service, dispatch, { immediate: true });

  return [data, dispatch] as [ShallowReactive<Result<T>>, Dispatch<T>];
};
