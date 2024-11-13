import { shallowReactive, watch, type WatchSource } from 'vue'

interface Opts<T> {
  default?: T
  initial?: boolean
}

interface Result<T> {
  value?: T
  error?: Error
  loading: boolean
}

export const useRequest = <T>(service: WatchSource<Promise<T> | undefined>, opts: Opts<T> = {}) => {
  opts = { initial: true, ...opts }

  const data = shallowReactive<Result<T>>({ loading: false, value: opts.default })

  const dispatch = (promise?: Promise<T>) => {
    data.loading = true
    data.error = void 0

    if (promise)
      promise
        .then((res) => {
          data.value = res
        })
        .catch((err) => {
          data.error = err
        })
        .finally(() => {
          data.loading = false
        })
    else data.loading = false
  }

  watch(service, dispatch, { immediate: opts.initial })

  return data
}
