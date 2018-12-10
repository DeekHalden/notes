<template lang='pug'>
include ./../util/index.pug
.container
  +b.FORM.form
    +e.H2.title {{ title }} note
    +e.control--100
      ui-input(:placeholder='"Title"'
               type='text'
               name='title'
               :val='note.title'
               v-model='note.title'
               validate='required')
    +e.control--100
      ui-input(:placeholder='"Description"'
               type='textarea'
               name='description'
               :val='note.description'
               v-model='note.description'
               validate='required')
    +e.control--100
      ui-checkbox(type='checkbox'
                  v-model='note.important'
                  :val='true'
                  name='important')
                template(slot='text') important?
    +e.control--100
      ui-button(@click='isColorVisible = !isColorVisible'
                btn-class='btn--flex btn--center').btn-wrapper--fixed
        +b.btn__text--success {{ buttonText }} color picker
    transition(name='fade')
      +e.control--100(v-if='isColorVisible')
        chrome-picker-component(v-model='note.color')
    +e.control--100
      ui-select(v-model='note.labels'
                :val='note.labels'
                :placeholder="'labels'"
                :dropdown-data='labels'
                :multiple='true'
                :taggable='true'
                :name='"tags"').multiselect--tags
    +e.control--100
      ui-select(v-model='note.categories'
                :val='note.categories'
                :placeholder="'Categories'"
                :dropdown-data='categories'
                :multiple='true'
                :taggable='true'
                :group-values="'subcategories'",
                :group-label="'title'"
                :group-select="true"
                :name='"tags"').multiselect--tags
    +e.control--100
      ui-button(@click='save'
                btn-class='btn--flex btn--center btn--success').btn-wrapper--fixed
        +b.btn__text--success save

  
</template>

<script>
import UiInput from "@/components/utils/UiInput"
import UiButton from "@/components/utils/UiButton"
import UiSelect from "@/components/utils/UiSelect"
import UiCheckbox from "@/components/utils/UiCheckbox"
import UiRadio from "@/components/utils/UiRadio"
import { successHandler } from "@/util/handlers"
import { Chrome as ChromePickerComponent } from "vue-color"
import { mapActions, mapState } from "vuex"
export default {
  computed: {
    ...mapState("categories", ["categories"]),
    ...mapState('labels', ['labels']),
    title() {
      return this.$route.params.id ? "Edit" : "Add"
    },
    buttonText() {
      return this.isColorVisible ? 'hide' : 'show'
    }
  },
  components: {
    UiInput,
    UiButton,
    UiSelect,
    UiRadio,
    UiCheckbox,
    ChromePickerComponent
  },
  data() {
    return {
      isColorVisible: false,
      note: {
        title: "",
        description: "",
        important: false,
        categories: [],
        color: {},
        labels: [],
        timestamp: ''
      }
    }
  },
  methods: {
    ...mapActions("notes", ["addNote", "fetchNote", "editNote"]),
    save() {
      this.$validator.validateAll().then(res => {
        if (res) {
          let id = this.$route.params.id
          let action = id ? "editNote" : "addNote"
          let textPart = id ? "edited" : "added"
          this.note.timestamp = new Date()
          this[action]({ note: this.note, id })
            .then(res => {
              Object.keys(this.note).map(k => (this.note[k] = ""))

              let data = {
                meta: {
                  title: "Congratulations!",
                  content: `Note ${textPart} successfully`
                },
                redirect: "/"
              }
              successHandler(data, this)
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  },
  async created() {},
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      let id = vm.$route.params.id
      if (id) {
        await vm.fetchNote(id)
        vm.note = vm.$store.state.notes.note
      } else {
        vm.$store.state.notes.note = {}
        Object.keys(vm.note).map(k => (vm.note[k] = ""))
      }
    })
  }
}
</script>

<style lang="stylus">


.vc-chrome 
  width: 100% !important

</style>

