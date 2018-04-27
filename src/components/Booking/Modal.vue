<template>
<div class="modal" :class="{'is-active': isOpen}">
  <div class="modal-background" @click="close"></div>

  <div class="modal-content">
    <section class="section has-background-white">
      <div>
        <a v-if="canBack" @click="back" class="button is-text">Back</a>
        <h2 class="title">{{title}}</h2>
      </div>

      <transition name="slide">
        <Booking :fsm="fsm"></Booking> 
      </transition>
    </section>
  </div>

  <button class="modal-close is-large" aria-label="close" @click="close"></button>
</div>  
</template>

<script>
import Booking from './index';
import BookingFSM from '../../stateMachines/booking';
import { BACK, INITIALIZE } from '../../stateMachines/transitions';

export default {
  props: {
    tripId: Number
  },
  data() {
    return {
      fsm: undefined,
      isOpen: false
    };
  },
  methods: {
    open(tripId) {
      this.fsm = new BookingFSM();
      this.fsm.handle(INITIALIZE, tripId);
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
      this.fsm.reset();
    },
    back() {
      this.fsm.handle(BACK);
    }
  },
  computed: {
    title() {
      return this.fsm && this.fsm.state;
    },
    canBack() {
      return this.fsm && this.fsm.states[this.fsm.state][BACK];
    }
  },
  components: {
    Booking
  }
}
</script>

<style>
.slide-leave-active,
.slide-enter-active {
  transition: 0.3s;
}

.slide-enter {
  transform: translate(100%, 0);
}

.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>

