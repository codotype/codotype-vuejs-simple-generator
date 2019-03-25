<template>
  <div class="row mb-3">
    <div class="col-lg-9 pr-0">
      <input
        class="form-control"
        @input="setFilter($event.target.value)"
        :value="filter"
        placeholder="Search"
      />
    </div>

    <div class="col-lg-3">
      <button class="btn btn-warning btn-block mr-2" @click="fetchFiltered('')">
        <i class="fa fa-search mr-2"></i>
        Clear Search
      </button>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import debounce from 'lodash/debounce'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    module: {
      type: String,
      required: true
    }
  },
  beforeCreate () {
    // Isolates the 'module' prop
    let module = this.$options.propsData.module

    // Defines Vue.component.computed
    this.$options.computed = mapGetters({
      filter: `${module}/list/filter`
    })
    // Defines Vue.component.methods
    this.$options.methods = {
      ...mapActions({
        fetchFiltered: `${module}/list/setFilter`
      }),
      setFilter (filter) {
        // Defines a function that sets the pagination's page to 0
        // And dispatches an api call to GET /api/module/search
        // after a 1000 delay from the last time the function was called
        // TLDR this throttles expensive search API calls
        if (!this.debouncedFetch) {
          this.debouncedFetch = debounce(this.fetchFiltered, 1000)
        }
        this.debouncedFetch(filter)
      }
    }
  }
}
</script>
