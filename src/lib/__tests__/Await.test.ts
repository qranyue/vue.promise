import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Component from "../Await.vue";

describe("Component", () => {
  const wait = <V>(v: V, t = 100) => new Promise<V>((resolve) => setTimeout(() => resolve(v), t));

  it("加载中测试", async () => {
    const promise = new Promise(() => {});
    const wrapper = mount(Component, {
      props: {
        promise,
      },
      slots: {
        loading: "<div>Loading...</div>",
      },
    });

    expect(wrapper.html()).toContain("Loading...");
  });

  it("错误测试", async () => {
    const promise = new Promise((_, reject) => reject(new Error("Test error")));
    const wrapper = mount(Component, {
      props: {
        promise,
      },
      slots: {
        error: ({ error }) => `<div>Error: ${error}</div>`,
      },
    });

    await promise.catch(() => {}); // 忽略错误;
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain("Error: Test error");
  });

  it("占位测试", async () => {
    const promise = wait(1000);
    const wrapper = mount(Component, {
      props: {
        promise,
      },
      slots: {
        placeholder: "<div>No data</div>",
        default(_) {
          return `<div>${_.value}</div>`;
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain("No data");

    await promise;
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain("1000");
  });

  it("结果测试", async () => {
    const promise = wait({ text: "data" });
    const wrapper = mount(Component, {
      props: {
        promise,
      },
      slots: {
        default: ({ value }) => `<div>${(value as { text: string }).text}</div>`,
      },
    });

    await promise;
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toContain("data");
  });
});
