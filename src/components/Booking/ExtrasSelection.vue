<template>
<div>
  Extras selection

  <form class="form" @submit.prevent="onSubmit">
    <div class="field" v-for="extra in extras" :key="extra.id">
      <label class="checkbox">
        <input type="checkbox" v-model="selectedExtrasById[extra.id]">
        {{extra.name}}
      </label>
    </div>

    <div class="field">
      <div class="control">
        <button class="button is-link">Select</button>
      </div>
      <div class="control">
        <a class="button is-link" @click.prevent="onSkip">Skip</a>
      </div>
    </div>
  </form>

</div>  
</template>

<script>
import Vuex from 'vuex';
import { filter } from 'ramda';
import { SELECT_EXTRAS } from '../../stateMachines/transitions';

export default {
  props: {
    tripId: { type: Number, required: true },
    done: { type: Function, required: true }
  },
  data() {
    return {
      selectedExtrasById: {}
    }
  },
  mounted() {
    this.selectedExtrasById = this.selectedIds.reduce((acc, id) => {
      return Object.assign(acc, { [id]: true });
    }, {});
  },
  computed: {
    ...Vuex.mapState({
      extras: 'extras',
      selectedIds: function(state) {
        return state.userTripsById[this.tripId].extrasIds || [];
      }
    })
  },
  methods: {
    onSkip() {
      return this.done();
    },
    onSubmit() {
      const selectedIds = Object.keys(filter(selected => !!selected, this.selectedExtrasById));
      
      return this.done(SELECT_EXTRAS, selectedIds);
    }
  }
}
</script>
