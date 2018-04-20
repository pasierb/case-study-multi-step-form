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
import Vuex from 'vuex';
import {
  SELECT_TRIP
} from '../../stateMachines/transitions';

export default {
  props: {
    tripId: Number,
    done: { type: Function, required: true },
  },
  computed: {
    ...Vuex.mapState(['trips'])
  },
  methods: {
    onSubmit(trip) {
      return this.done(SELECT_TRIP, trip);
    }
  }
}
</script>

<style>
  .card {
    margin-bottom: 10px;
  }
</style>

