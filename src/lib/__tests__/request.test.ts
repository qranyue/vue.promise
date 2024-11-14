import { describe, expect, it } from "vitest";
import { nextTick, shallowReactive, shallowRef } from "vue";
import { usePromise } from "../request";

describe("request", () => {
  const wait = <T>(value?: T, time = 1000) => new Promise<T>((resolve) => setTimeout(() => resolve(value as T), time));
  it("主动触发测试", async () => {
    const [data, dispatch] = usePromise();
    expect(data.loading).toBe(false);
    expect(data.value).toEqual(void 0);
    expect(data.loading).toBe(false);
    dispatch(wait("deno"));
    expect(data.loading).toBe(true);
    await wait();
    expect(data.loading).toBe(false);
    expect(data.value).toBe("deno");
  });

  it("加载测试", async () => {
    const [data] = usePromise(() => wait("deno"));
    expect(data.value).toEqual(void 0);
    expect(data.loading).toBe(true);
    await wait();
    expect(data.loading).toBe(false);
    expect(data.value).toBe("deno");
  });

  it("变化测试", async () => {
    const form = shallowReactive({ value: void 0 as unknown as Promise<string> });
    const [data] = usePromise(() => form.value);
    expect(data.value).toEqual(void 0);
    form.value = wait("deno");
    await nextTick();
    expect(data.loading).toBe(true);
    await wait();
    expect(data.loading).toBe(false);
    expect(data.value).toBe("deno");
  });

  it("变化测试 Ref", async () => {
    const form = shallowRef<Promise<string>>();
    const [data] = usePromise(form);
    expect(data.value).toEqual(void 0);
    form.value = wait("deno");
    await nextTick();
    expect(data.loading).toBe(true);
    await wait();
    expect(data.loading).toBe(false);
    expect(data.value).toBe("deno");
  });
});
