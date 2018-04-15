import machina from 'machina';
import {
  UNINITIALIZED,
  TRIP_SELECTION,
  EXTRAS_SELECTION,
  INSURANCE_SELECTION,
  PERSONAL_INFORMATION,
  RECAP,
  PAYMENT,
  CONFIRMATION
} from './states';
import {
  INITIALIZE,
  NEXT
} from './transitions';

export default machina.Fsm.extend({
  initialState: UNINITIALIZED,
  states: {
    [UNINITIALIZED]: {
      [INITIALIZE]() {
        this.transition(TRIP_SELECTION);
      }
    },
    [TRIP_SELECTION]: {
      [NEXT]: EXTRAS_SELECTION
    },
    [EXTRAS_SELECTION]: {
      [NEXT]: INSURANCE_SELECTION
    },
    [INSURANCE_SELECTION]: {
      [NEXT]: PERSONAL_INFORMATION
    },
    [RECAP]: {
      [NEXT]: PAYMENT
    },
    [PAYMENT]: {
      [NEXT]: CONFIRMATION
    }
  }
});
