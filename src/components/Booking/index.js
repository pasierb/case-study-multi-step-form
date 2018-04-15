import BookingFSM from '../../stateMachines/booking';
import {
  INITIALIZE,
  NEXT
} from '../../stateMachines/transitions';
import {
  TRIP_SELECTION,
  EXTRAS_SELECTION
} from '../../stateMachines/states';
import TripSelection from './TripSelection.vue';
import ExtrasSelection from './ExtrasSelection.vue';

const stateComponents = {
  [TRIP_SELECTION]: TripSelection,
  [EXTRAS_SELECTION]: ExtrasSelection
}

export default {
  props: {
    fsm: {
      type: Object,
      default() {
        return new BookingFSM();
      }
    }
  },
  created() {
    this.fsm.handle(INITIALIZE);
  },
  methods: {
    onSubmit() {
      this.fsm.handle(NEXT);
    }
  },
  render(h) {
    const vm = this;

    return  h(stateComponents[vm.fsm.state], {
      on: {
        submit: vm.onSubmit
      }
    })
  }
};
