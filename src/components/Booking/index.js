import Vuex from 'vuex';
import { pick, values } from 'ramda';
import BookingFSM from '../../stateMachines/booking';
import {
  INITIALIZE,
  NEXT
} from '../../stateMachines/transitions';
import {
  UNINITIALIZED,
  EXTRAS_SELECTION,
  PAYMENT,
  PERSONAL_INFORMATION,
  RECAP,
  TRIP_SELECTION,
} from '../../stateMachines/states';
import { TRIP_SET } from '../../stateMachines/events';

import ExtrasSelection from './ExtrasSelection.vue';
import Loading from './Loading.vue';
import Payment from './Payment.vue';
import PersonalInformation from './PersonalInformation.vue';
import Recap from './Recap.vue';
import TripSelection from './TripSelection.vue';

const stateComponents = {
  [EXTRAS_SELECTION]: ExtrasSelection,
  [UNINITIALIZED]: Loading,
  [PAYMENT]: Payment,
  [PERSONAL_INFORMATION]: PersonalInformation,
  [RECAP]: Recap,
  [TRIP_SELECTION]: TripSelection,
};

export default {
  props: {
    fsm: { type: Object, required: true }
  },
  data() {
    return {
      tripId: undefined
    };
  },
  created() {
    this.fsm.on(TRIP_SET, tripId => {
      this.tripId = tripId;
    });
  },
  methods: {
    onDone() {
      const [transition, ...params] = arguments;

      return this.fsm.handle(transition || NEXT, ...params);
    }
  },
  computed: {
    ...Vuex.mapState({
      trips: 'trips',
      extras: 'extras',
      userInfo: 'userInfo',
      selectedTrip(state, getters) {
        return getters.tripsById[this.tripId];
      },
      selectedExtras(state, getters) {
        return values(pick(
          state.selectedExtrasIdsByTripId[this.tripId] || [],
          getters.extrasById
        ));
      },
    }),
    totalPrice() {
      if (!this.selectedTrip) return null;

      return this.selectedExtras.reduce((sum, extra) => (
        sum + extra.price
      ), this.selectedTrip.price);
    }
  },
  render(h) {
    const vm = this;

    return  h(stateComponents[vm.fsm.state], {
      props: {
        done: vm.onDone,
        extras: vm.extras,
        selectedExtras: vm.selectedExtras,
        selectedTrip: vm.selectedTrip,
        trips: vm.trips,
        userInfo: vm.userInfo,
      }
    });
  }
};
