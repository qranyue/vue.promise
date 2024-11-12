import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { AwaitPromise } from '..'

describe('AwaitPromise', () => {
  it('should resolve after 1 second', async () => {
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
})
