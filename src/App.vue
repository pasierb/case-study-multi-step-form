<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Booking></Booking>
  </div>
</template>

<script>
import Booking from './components/Booking'

export default {
  name: 'app',
  components: {
    Booking
  }
}
</script>
