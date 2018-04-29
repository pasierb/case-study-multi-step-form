<template>
<div class="modal" :class="{'is-active': isOpen}">
  <div class="modal-background" @click="close"></div>


  <div class="modal-card">
    <div class="modal-card-head">
      <a v-if="canBack" @click="back" class="button is-rounded">
        <span class="icon">
          <i class="fa fa-arrow-left"></i>
        </span>
        <span>Back</span>
      </a>

      <p class="modal-card-title"></p>

      <a @click="close" class="button is-rounded">
        <span class="icon">
          <i class="fa fa-times"></i>
        </span>
        <span>Close</span>
      </a>
    </div>
    <div class="modal-card-body">
      <TripListItem v-bind="selectedTrip" v-if="selectedTrip" />

      <div>
        <h2 class="title">{{title}}</h2>
      </div>

      <transition name="slide">
        <Booking :fsm="fsm"></Booking> 
      </transition>
    </div>
  </div>

  <button class="modal-close is-large" aria-label="close" @click="close"></button>
</div>  
</template>

<script>
import Vuex from 'vuex';
import Booking from './index';
import TripListItem from '../TripListItem.vue';
import BookingFSM from '../../stateMachines/booking';
import { BACK, INITIALIZE } from '../../stateMachines/transitions';
import { TRIP_SET } from '../../stateMachines/events';

export default {
  props: {
    tripId: Number
  },
  data() {
    return {
      fsm: new BookingFSM(),
      isOpen: false,
      selectedTripId: undefined,
    };
  },
  created() {
    this.fsm.on(TRIP_SET, tripId => {
      this.selectedTripId = tripId;
    });
  },
  methods: {
    open(tripId) {
      this.fsm.reset();
      this.fsm.handle(INITIALIZE, tripId);
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    back() {
      this.fsm.handle(BACK);
    }
  },
  computed: {
    ...Vuex.mapState({
      selectedTrip(state, getters) {
        return getters.tripsById[this.selectedTripId];
      },
    }),
    title() {
      return this.fsm && this.fsm.state;
    },
    canBack() {
      return this.fsm && this.fsm.states[this.fsm.state][BACK];
    }
  },
  components: {
    Booking,
    TripListItem
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

