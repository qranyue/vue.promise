import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { AwaitPromise } from '..'

describe('AwaitPromise', () => {
  it('异步加载', async () => {
    const com = mount(AwaitPromise, {
      props: { promise: new Promise((resolve) => setTimeout(() => resolve('deno'), 1000)) },
      slots: {
        loading: () => 'Loading...',
        default: ({ value }) => value,
      },
    })

    expect(com.text()).toBe('Loading...')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    expect(com.text()).toBe('deno')
  })

  it('无加载', () => {
    const com = mount(AwaitPromise, {
      slots: {
        loading: () => 'Loading...',
        default: () => 'deno',
      },
    })

    expect(com.text()).toBe('deno')
  })
})
