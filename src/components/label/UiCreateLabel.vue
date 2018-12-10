<template lang="pug">
include ./../../util/index.pug
+b.FORM.form
  +e.control--100 
    ui-input(:placeholder='"Label title"'
             type='text'
             name='title'
             :val='title'
             v-model='title'
             validate='required')
  +e.control--100
    ui-button(@click='save'
              btn-class='btn--flex btn--center btn--success').btn-wrapper--fixed
      +b.btn__text--success save

</template>

<script>
import { mapActions } from "vuex"
import UiInput from "@/components/utils/UiInput"
import UiButton from "@/components/utils/UiButton"
import { successHandler } from "@/util/handlers"
export default {
  components: {
    UiInput,
    UiButton
  },
  data() {
    return {
      title: ""
    }
  },
  methods: {
    ...mapActions("labels", ["addLabel"]),
    save() {
      this.$validator.validateAll().then(res => {
        if (res) {
          this.addLabel({ title: this.title }).then(res => {
            this.title = ""
            let data = {
              meta: {
                title: "Congratulations!",
                content: `Label added successfully`
              },
            }
            successHandler(data, this)
          })
          .catch(err => {
            this.$validator.errors.add({
              field: 'title',
              msg: err
            })
          })
        }
      })
    }
  }
}
</script>

