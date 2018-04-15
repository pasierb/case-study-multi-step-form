<template>
  <div id="app">
    <h1 class="title">Booking</h1>

    <a @click.prevent="openModal">Open</a>

    <Booking></Booking>
    <BookingModal ref="modal"></BookingModal>

  </div>
</template>

<script>
import Booking from './components/Booking'
import BookingModal from './components/Booking/Modal.vue'

export default {
  name: 'app',
  methods: {
    openModal() {
      this.$refs.modal.open();
    }
  },
  components: {
    Booking,
    BookingModal
  }
}
</script>
