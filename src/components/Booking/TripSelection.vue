<template>
<div>
  <ul>
    <li v-for="(trip, i) in trips" :key="i">
      <div class="card">
        <div class="card-content">
          {{ trip.airlines }}
          {{ trip.price }}
        </div>
        <div class="card-footer">
          <a @click.prevent="onSubmit(trip)" class="card-footer-item">Select</a>
        </div>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import {
  SELECT_TRIP
} from '../../stateMachines/transitions';

export default {
  props: {
    fsm: { type: Object, required: true }
  },
  methods: {
    onSubmit(trip) {
      this.$emit('submit', SELECT_TRIP, { trip });
    }
  },
  computed: {
    trips() { return this.fsm.data.trips; }
  }
}
</script>

<style>
  .card {
    margin-bottom: 10px;
  }
</style>

