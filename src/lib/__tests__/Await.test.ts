import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Await } from "..";
import { defineComponent, h, shallowRef } from "vue";

describe("AwaitPromise", () => {
  it("异步加载", async () => {
    const com = mount(Await, {
      props: { promise: new Promise((resolve) => setTimeout(() => resolve("deno"), 1000)) },
      slots: {
        loading: () => "Loading...",
        default: ({ value }) => value,
      },
    });

    expect(com.text()).toBe("Loading...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(com.text()).toBe("deno");
  });

  it("无加载", () => {
    const com = mount(Await, {
      slots: {
        loading: () => "Loading...",
        default: () => "deno",
      },
    });

    expect(com.text()).toBe("deno");
  });

  it("变化", async () => {
    const App = defineComponent(() => {
      const p = shallowRef();

      setTimeout(() => {
        p.value = new Promise((resolve) => setTimeout(() => resolve("deno"), 1000));
      }, 1000);
      return () => {
        return h(
          Await,
          { promise: p.value },
          {
            loading: () => "Loading...",
            default: ({ value }: { value: string }) => value || "Promise not ready",
          },
        );
      };
    });
    const com = mount(App);

    expect(com.text()).toBe("Promise not ready");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(com.text()).toBe("Loading...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(com.text()).toBe("deno");
  });
});
