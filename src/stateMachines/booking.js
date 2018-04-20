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
  ADD_USER_TRIP,
  SET_USER_TRIP_EXTRAS
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
        store.commit(ADD_USER_TRIP, trip);
        this.transition(EXTRAS_SELECTION);
      }
    },
    [EXTRAS_SELECTION]: {
      [NEXT]: PERSONAL_INFORMATION,
      [SELECT_EXTRAS](extrasIds) {
        store.commit(SET_USER_TRIP_EXTRAS, {
          tripId: this.tripId,
          extrasIds
        });
        this.handle(NEXT);
      },
      [BACK]: TRIP_SELECTION,
      [RESET]: TRIP_SELECTION
    },
    [PERSONAL_INFORMATION]: {
      [NEXT]: RECAP,
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
        return submitPayment().then(() => {
          this.transition(CONFIRMATION);
        });
      }
    },
    [CONFIRMATION]: {}
  }
});
