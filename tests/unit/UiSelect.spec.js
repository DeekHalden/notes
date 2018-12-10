import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import VeeValidate, { Validator } from 'vee-validate'
import UiSelect from '@/components/utils/UiSelect'
const localVue = createLocalVue()
localVue.use(VeeValidate)
const v = new VeeValidate.Validator()


describe('UiSelect.vue', () => {
  
  it('checked updates if val comes with diff value', () => {
    let wrapper = mount(UiSelect, {
      localVue,
      inject: ['$validator'],
      provide: () => ({
        $validator: v
      }),
      propsData: {
        dropdownData: [],
        val: {
          title: 'USA'
        },
        name: 'country'
      }
    }) 
    expect(wrapper.vm.checked).not.toBe('')
  })
  it('dropdown data comes with correct type', () => {
    let wrapper = mount(UiSelect, {
      localVue,
      inject: ['$validator'],
      provide: () => ({
        $validator: v
      }),
      propsData: {
        dropdownData: [],
        val: '',
        title: 'name',
        name: 'country'
      }
    })
    expect(wrapper.props('dropdownData', [])).toBeTruthy()
  })
})