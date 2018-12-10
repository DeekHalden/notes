import { shallowMount, createLocalVue } from '@vue/test-utils'

import VeeValidate, { Validator } from 'vee-validate'

import flushPromises from 'flush-promises'

import UiInput from '@/components/utils/UiInput'

import { inputMixin } from '@/components/utils/input'

const localVue = createLocalVue()

localVue.use(VeeValidate)


const v = new VeeValidate.Validator()

// localVue.mixin(inputMixin)

const component = (val = 'Dmytro', type = 'text', inputType = '!number', validate = 'required') => shallowMount(UiInput, {
  localVue,
  mixins: [ inputMixin ],
  inject: ['$validator'],
  provide: () => ({
    $validator: v
  }),
  propsData: {
    name: 'first_name',
    validate,
    val,
    type,
    inputType
  }
})
describe('UiInput', () => {

  it('renders inside DOM with apropriate name', () => {
    expect(component().find('input').element.name).toBe('first_name')
  })
  it('has input value presented', () => {
    expect(
      component('val', 'text', 'text').find('input').element.value
    ).toBe('val')
  })
  it('throws an error if field value has only spaces', async () => {
    let localComponent = component(' ', 'text', 'text', 'required')
    expect(localComponent.vm.errors.count()).toBe(0)
    localComponent.find('input[type=text]').trigger('input')
    await flushPromises()
    expect(localComponent.vm.errors.count()).toBe(1)
  })
})  

