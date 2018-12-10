<template lang="pug">
include ./../util/index.pug
+b.container
  +e.H2.title Categories
  ui-create-category(:category-item='category')
  +b.row--wrap
    +e.el--default(v-for='(category, index) in categories'
                  :key='index')
      ui-card(:note='category'
              :index='index')
        template(slot='action')
          +b-context('card')
            +e.action(@click='deleteCategory(index)') &times;
        template(slot='title')
          +b-context('card')
            +e.title(@click='setCategory(index)') title: {{ category.title }}
        +b-context('card')
          +e.labels
            +e.title--default Subcategories:
            +e.label(v-for='subcategory in category.subcategories') {{ subcategory.title }}
</template>

<script>
import UiCreateCategory from '@/components/category/UiCreateCategory'
import { mapActions, mapState } from 'vuex'
import UiCard from '@/components/card/UiCard.vue'

export default {
  components: {
    UiCreateCategory,
    UiCard
  },
  computed: {
    ...mapState('categories', [
      'categories',
      'category'
    ])
  },
  methods: {
    ...mapActions('categories', {
      fetchCategories: 'fetch',
      deleteCategory: 'deleteCategory',
      'setCategory': 'setCategory'
    }),
  },
  mounted() {
    this.fetchCategories()    
  }
  
}
</script>

