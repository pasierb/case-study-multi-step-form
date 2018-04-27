<template>
<div>
  <form class="form" @submit.prevent="onSubmit">
    <div class="field" v-for="extra in extras" :key="extra.id">
      <label class="checkbox">
        <input type="checkbox" v-model="selectedExtrasById[extra.id]">
        {{extra.name}}
      </label>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">Select</button>
      </div>
      <div class="control">
        <a class="button is-text" @click.prevent="onSkip">Skip</a>
      </div>
    </div>
  </form>

</div>  
</template>

<script>
import { filter } from 'ramda';
import { SELECT_EXTRAS } from '../../stateMachines/transitions';

export default {
  props: {
    extras: { type: Array, required: true },
    done: { type: Function, required: true },
    selectedExtras: { type: Array, default: () => [] }
  },
  data() {
    return {
      selectedExtrasById: this.selectedExtras.reduce((acc, extra) => {
        return Object.assign(acc, {[extra.id]: true});
      }, {})
    };
  },
  methods: {
    onSkip() {
      return this.done();
    },
    onSubmit() {
      return this.done(SELECT_EXTRAS, {
        extrasIds: Object.keys(filter(selected => !!selected, this.selectedExtrasById))
      });
    }
  }
}
</script>
