<template>
<div>
  <TripListItem v-for="trip in trips"
    :key="trip.id"
    v-bind="trip"
    @selectExtras="onSubmit"
    @bookNow="onBookNow"
    class="trip-list-item">
    <div class="has-text-right">
      <a @click.prevent="onSubmit(trip.id)" class="button is-link">Select extras</a>
      <a @click.prevent="onBookNow(trip.id)" class="button is-text">Book now</a>
    </div>
  </TripListItem>
</div>
</template>

<script>
import TripListItem from '../TripListItem.vue'
import {
  SELECT_TRIP,
  BOOK_NOW
} from '../../stateMachines/transitions';

export default {
  props: {
    trips: { type: Array, required: true },
    done: { type: Function, required: true },
  },
  methods: {
    onSubmit(tripId) {
      return this.done(SELECT_TRIP, { tripId });
    },
    onBookNow(tripId) {
      return this.done(BOOK_NOW, { tripId });
    }
  },
  components: {
    TripListItem,
  }
}
</script>
