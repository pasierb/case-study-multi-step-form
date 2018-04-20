import BookingFSM from '../../stateMachines/booking';
import {
  INITIALIZE,
  NEXT
} from '../../stateMachines/transitions';
import {
  TRIP_SELECTION,
  EXTRAS_SELECTION,
  PERSONAL_INFORMATION,
  RECAP,
  PAYMENT,
  LOADING
} from '../../stateMachines/states';

import TripSelection from './TripSelection.vue';
import ExtrasSelection from './ExtrasSelection.vue';
import PersonalInformation from './PersonalInformation.vue';
import Loading from './Loading.vue';
import Recap from './Recap.vue';
import Payment from './Payment.vue';

const stateComponents = {
  [TRIP_SELECTION]: TripSelection,
  [EXTRAS_SELECTION]: ExtrasSelection,
  [PERSONAL_INFORMATION]: PersonalInformation,
  [LOADING]: Loading,
  [RECAP]: Recap,
  [PAYMENT]: Payment
};

export default {
  props: {
    fsm: {
      type: Object,
      default: () => new BookingFSM()
    }
  },
  created() {
    this.fsm.handle(INITIALIZE);
  },
  methods: {
    onDone() {
      const [transition, ...params] = arguments;

      this.fsm.handle(transition || NEXT, ...params);
    }
  },
  render(h) {
    const vm = this;

    return  h(stateComponents[vm.fsm.state], {
      props: {
        done: vm.onDone,
        tripId: vm.fsm.tripId
      }
    });
  }
};
