import {describe, expect, it} from 'vitest'

import {shallowMount} from '@vue/test-utils'
import App from './App.vue'

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = shallowMount(App, {
      global: {stubs: ['router-view', 'router-link']}
    })
    expect(wrapper.exists()).toBe(true)
  })
})
