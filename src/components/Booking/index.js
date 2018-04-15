import BookingFSM from '../../stateMachines/booking';
import {
  INITIALIZE,
  NEXT
} from '../../stateMachines/transitions';
import {
  TRIP_SELECTION,
  EXTRAS_SELECTION,
  INSURANCE_SELECTION,
  LOADING
} from '../../stateMachines/states';
import TripSelection from './TripSelection.vue';
import ExtrasSelection from './ExtrasSelection.vue';
import InsuranceSelection from './InsuranceSelection.vue';
import Loading from './Loading.vue';

const stateComponents = {
  [TRIP_SELECTION]: TripSelection,
  [EXTRAS_SELECTION]: ExtrasSelection,
  [INSURANCE_SELECTION]: InsuranceSelection,
  [LOADING]: Loading
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
    onSubmit() {
      const [transition, ...params] = arguments;

      this.fsm.handle(transition || NEXT, ...params);
    }
  },
  render(h) {
    const vm = this;

    return  h(stateComponents[vm.fsm.state], {
      props: {
        fsm: vm.fsm
      },
      on: {
        submit: vm.onSubmit
      }
    });
  }
};
