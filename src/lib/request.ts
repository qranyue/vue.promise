import { shallowReactive, watch, type WatchSource } from "vue";

/** 异步值 */
interface Result<T> {
  /** 异步返回参 */
  value?: T;
  /** 错误 */
  error?: unknown;
  /** 加载中 */
  loading: boolean;
}

/** 异步请求 */
interface Dispatch<T> {
  (promise: Promise<T>): Promise<void>;
}

export const usePromise = <T>(service?: WatchSource<Promise<T> | void>, defaultValue?: T) => {
  const data = shallowReactive<Result<T>>({ loading: false, value: defaultValue });

  const dispatch: Dispatch<T> = async (promise) => {
    data.loading = true;
    data.error = void 0;

    try {
      const res = await promise;
      data.value = res;
    } catch (err) {
      data.error = err;
    } finally {
      data.loading = false;
    }
  };

  if (service) watch(service, (v) => v && dispatch(v), { flush: "sync", immediate: true });

  return [data, dispatch] as const;
};
