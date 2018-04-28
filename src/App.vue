<template>
  <div id="app">
    <h1 class="title is-1">Booking</h1>

    <a @click.prevent="openModal()">Open</a>

    <div>
      <TripListItem v-for="trip in trips" :key="trip.id" v-bind="trip">
        <div class="has-text-right">
          <a @click.prevent="openModal(trip.id)" class="button is-primary">book</a>
        </div>
      </TripListItem>
    </div>
    <BookingModal ref="modal"></BookingModal>
  </div>
</template>

<script>
import Vuex from 'vuex';
import TripListItem from './components/TripListItem.vue';
import BookingModal from './components/Booking/Modal.vue';
import store, { FETCH_DATA } from './store';

store.dispatch(FETCH_DATA);

export default {
  name: 'app',
  computed: {
    ...Vuex.mapState(['trips']),
  },
  methods: {
    openModal(tripId) {
      this.$refs.modal.open(tripId);
    }
  },
  components: {
    TripListItem,
    BookingModal
  }
}
</script>
