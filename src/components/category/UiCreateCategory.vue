<template lang="pug">
include ./../../util/index.pug
+b.FORM.form
  transition(name='fade')
    +e.control--100(v-if='errors.has("non_field_errors")')
      +e.error {{ errors.first("non_field_errors") }}
  +e.control--100 
  
    ui-input(:placeholder='"category title"'
            type='text'
            name='title'
            :val='category.title'
            v-model='category.title'
            validate='required')
  +e.control--100(v-for='(subcategory, index) in category.subcategories')
    ui-input(:placeholder='"subcategory title"'
              type='text'
              :name='"subcategory title "+index'
              :val='subcategory.title'
              v-model='subcategory.title'
              validate='required')
      template(slot='icon' v-if='category.subcategories.length > 1')
        span(@click='removeSubcategory(index)') &times;

  +e.control--100
    ui-button(@click='addSubcategory'
              btn-class='btn--flex btn--center').btn-wrapper--fixed
      +b.btn__text--success add subcategory
  +e.control--100
    ui-button(@click='save'
              btn-class='btn--flex btn--center btn--success').btn-wrapper--fixed
      +b.btn__text--success save
</template>

<script>
import UiInput from "@/components/utils/UiInput"
import UiButton from "@/components/utils/UiButton"
import { mapActions } from "vuex"
import { getDuplicates } from '@/util/handlers'
export default {
  components: {
    UiInput,
    UiButton
  },

  props: {
    categoryItem: {
      required: false,
      type: Object
    }
  },
  watch: {
    categoryItem: {
      handler(val) {
        if (val.subcategories) {
          this.category = val
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      category: {
        title: "",
        subcategories: [
          {
            title: ""
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions("categories", ["postCategory", "editCategory"]),
    save() {
      let items = this.category.subcategories.map(i => i.title)
      let val = getDuplicates(items)
      
      let errors = false
      Object.keys(val).forEach(v => {
        val[v].forEach(value => {
          this.$validator.errors.add({
            field: `subcategory title ${value}`,
            msg: 'These fields have duplicates'
          })
          errors = true
        })
      })
      if (!errors) {
        this.$validator.validateAll().then(res => {
          if (res) {
            let action = this.category.index >= 0 ? 'editCategory' : 'postCategory'
            let { index } = this.category
            this[action]({ category: this.category, index })
              .then(res => {
                this.category = {
                  title: '',
                  subcategories: [
                    {
                      title: ''
                    }
                  ]
                }
              })
              .catch(err => {
                this.$validator.errors.add({
                  field: 'non_field_errors',
                  msg: err
                })
              })
          }
        })
      }
    },
    
    addSubcategory() {
      this.category.subcategories.push({
        title: ""
      })
    },
    removeSubcategory(index) {
      this.errors.remove()
      this.category.subcategories.splice(index, 1)
    }
  }
}
</script>

