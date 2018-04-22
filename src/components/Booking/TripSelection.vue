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
    tripId: Number,
    trips: { type: Array, required: true },
    done: { type: Function, required: true },
  },
  methods: {
    onSubmit(trip) {
      return this.done(SELECT_TRIP, trip);
    }
  }
}
</script>
