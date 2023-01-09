import { test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TestVue from '../components/Test.vue'
// import LoginForm from '../components/LoginForm.vue'

test('loginForm', () => {
  // console.log(LoginForm)
  // const wrapper = mount(LoginForm)
  // expect(wrapper.text()).toContain('Login')
  const wrapper = mount(TestVue)
  console.log(wrapper.text())
  expect(wrapper.text()).toContain('Hello')
})
