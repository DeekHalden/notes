
import Vue from 'vue'

export const inputMixin = Vue.mixin({
  computed: {
    attrs() {
      let { placeholder, validate, ...attrs } = this.$attrs
      return {
        ...attrs
      }
    },
    method() {
      return 'checkbox' === this.$attrs.type ? 'checked' : 'value'
    },
    listeners() {
      return {
        ...this.$listeners,
        keypress: ($event) => {
          if (this.inputType === 'number') {
            let charCode = $event.which
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
              $event.preventDefault()
            }
          }
        },
        input: ($event) => this.$emit('input', $event.target[this.method]),
        keyup: ($event) => 
          'Enter' === $event.key ? 
            this.$emit('enter', $event.target.value) : '',
        blur: (event) => {
          let { value } = event.target
          if (!value) {
            this.active = false
          }
          this.$emit('blur')
        },
        focus: () => this.active = true
      }
    }
  }
})
