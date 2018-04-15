import machina from 'machina';
import {
  UNINITIALIZED,
  TRIP_SELECTION,
  EXTRAS_SELECTION,
  INSURANCE_SELECTION,
  PERSONAL_INFORMATION,
  RECAP,
  LOADING,
  PAYMENT,
  CONFIRMATION
} from './states';
import {
  INITIALIZE,
  NEXT,
  BACK,
  RESET,
  PAY,
  SELECT_TRIP
} from './transitions';
import { fetchData, submitPayment } from '../api';

export default machina.Fsm.extend({
  initialState: UNINITIALIZED,
  initialize() {
    this.data = {};
  },
  states: {
    [UNINITIALIZED]: {
      [INITIALIZE]() {
        this.transition(LOADING);

        return fetchData().then(data => {
          this.data = data;
          this.transition(TRIP_SELECTION);
        });
      }
    },
    [LOADING]: {},
    [TRIP_SELECTION]: {
      [SELECT_TRIP]({ trip }) {
        this.data.selectedTrip = trip;

        this.transition(EXTRAS_SELECTION);
      }
    },
    [EXTRAS_SELECTION]: {
      [NEXT]: INSURANCE_SELECTION,
      [BACK]: TRIP_SELECTION,
      [RESET]: TRIP_SELECTION
    },
    [INSURANCE_SELECTION]: {
      [NEXT]: PERSONAL_INFORMATION,
      [BACK]: EXTRAS_SELECTION,
      [RESET]: TRIP_SELECTION
    },
    [RECAP]: {
      [NEXT]: PAYMENT,
      [BACK]: INSURANCE_SELECTION,
      [RESET]: TRIP_SELECTION
    },
    [PAYMENT]: {
      [RESET]: TRIP_SELECTION,
      [BACK]: RECAP,
      [PAY]() {
        return submitPayment().then(() => {
          this.transition(CONFIRMATION);
        });
      }
    },
    [CONFIRMATION]: {}
  }
});
