import machina from 'machina';
import {
  UNINITIALIZED,
  TRIP_SELECTION,
  EXTRAS_SELECTION,
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
  SELECT_TRIP,
  SELECT_EXTRAS
} from './transitions';
import store, {
  FETCH_DATA,
  SET_TRIP_EXTRAS,
  SET_USER_INFO
} from '../store';

export default machina.Fsm.extend({
  initialState: UNINITIALIZED,
  initialize() {
    this.tripId = undefined;
  },
  states: {
    [UNINITIALIZED]: {
      [INITIALIZE]() {
        this.transition(LOADING);
        store.dispatch(FETCH_DATA).then(this.transition.bind(this, TRIP_SELECTION));
      }
    },
    [LOADING]: {},
    [TRIP_SELECTION]: {
      [SELECT_TRIP](trip) {
        this.tripId = trip.id;
        this.transition(EXTRAS_SELECTION);
      }
    },
    [EXTRAS_SELECTION]: {
      [NEXT]: PERSONAL_INFORMATION,
      [SELECT_EXTRAS](extrasIds) {
        store.commit(SET_TRIP_EXTRAS, {
          tripId: this.tripId,
          extrasIds
        });
        this.handle(NEXT);
      },
      [BACK]: TRIP_SELECTION,
      [RESET]: TRIP_SELECTION
    },
    [PERSONAL_INFORMATION]: {
      [NEXT](data) {
        store.commit(SET_USER_INFO, data);
        this.transition(RECAP);
      },
      [BACK]: EXTRAS_SELECTION,
      [RESET]: TRIP_SELECTION
    },
    [RECAP]: {
      [NEXT]: PAYMENT,
      [BACK]: PERSONAL_INFORMATION,
      [RESET]: TRIP_SELECTION
    },
    [PAYMENT]: {
      [RESET]: TRIP_SELECTION,
      [BACK]: RECAP,
      [PAY]() {
        // return submitPayment().then(() => {
        //   this.transition(CONFIRMATION);
        // });
      }
    },
    [CONFIRMATION]: {}
  }
});
