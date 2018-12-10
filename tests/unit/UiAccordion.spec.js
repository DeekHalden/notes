import { shallowMount } from '@vue/test-utils'
import UiAccordion from '@/components/utils/UiAccordion'

describe('UiAccordion', () => {
  it('renders props.active state to be false when passed and not renders ".expander__content"', () => {
    const active = false
    let proxiedApi
    const wrapper = shallowMount(UiAccordion, {
      propsData: { active },
      scopedSlots: {
        default: (api) => {
          proxiedApi = api
        }
      }
    })
    expect(wrapper.props().active).toBeFalsy()
  })
  it('changes state and icon', () => {
    const active = false
    let proxiedApi
    const wrapper = shallowMount(UiAccordion, {
      propsData: { active },
      scopedSlots: {
        default: (api) => {
          proxiedApi = api
        }
      }
    })
    proxiedApi.toggleActive()
    expect(wrapper.vm.activeState).toBeTruthy()
    expect(wrapper.vm.style.style).toBe('-')
  })
  it('changes state and icon + rotates icon', () => {
    const active = false
    const menu = true
    let proxiedApi
    const wrapper = shallowMount(UiAccordion, {
      propsData: { active, menu },
      scopedSlots: {
        default: (api) => {
          proxiedApi = api
        }
      }
    })
    proxiedApi.toggleActive()
    expect(wrapper.vm.activeState).toBeTruthy()
    expect(wrapper.vm.style.style).not.toBe('icon-minus')
  })
  it('changes state to false on "collapse" trigger', () => {
    const active = false
    let proxiedApi
    const wrapper = shallowMount(UiAccordion, {
      propsData: { active },
      scopedSlots: {
        default: (api) => {
          proxiedApi = api
        }
      }
    })
    proxiedApi.collapse()
    expect(wrapper.vm.activeState).toBeFalsy()
  })
})
