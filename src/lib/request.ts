import { shallowReactive, watch, type ShallowReactive, type WatchSource } from "vue";

/** 配置项 */
interface Opts<T> {
  /** 默认值 */
  default?: T;
  /** 初始化 */
  immediate?: boolean;
}

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

export const usePromise = <T>(service: WatchSource<Promise<T> | undefined>, opts: Opts<T> = {}) => {
  opts = { immediate: true, ...opts };

  const data = shallowReactive<Result<T>>({ loading: false, value: opts.default });

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

  watch(service, dispatch, { immediate: opts.immediate });

  return [data, dispatch] as [ShallowReactive<Result<T>>, Dispatch<T>];
};
