import machina from 'machina';
import {
  UNINITIALIZED,
  TRIP_SELECTION,
  EXTRAS_SELECTION,
  PERSONAL_INFORMATION,
  RECAP,
  PAYMENT,
  CONFIRMATION,
  LOADING
} from './states';
import {
  ACCEPT_PAYMENT,
  BACK,
  BOOK_NOW,
  INITIALIZE,
  LIST_TRIPS,
  LOAD_TRIPS,
  LOADING_SUCCESS,
  NEXT,
  PAY,
  RECEIVE_TRIPS,
  REJECT_PAYMENT,
  SELECT_EXTRAS,
  SELECT_TRIP,
} from './transitions';
import { PROCESSING_PAYMENT, PAYMENT_SUCCEDED, TRIP_SET } from './events';
import store, {
  FETCH_DATA,
  SET_TRIP_EXTRAS,
  SET_USER_INFO,
  SUBMIT_TRIP_PAYMENT,
} from '../store';


export default machina.Fsm.extend({
  initialState: UNINITIALIZED,
  reset() {
    this.tripId = undefined;
    return this.transition(UNINITIALIZED);
  },
  states: {
    [LOADING]: {
      [LOADING_SUCCESS](state) {
        this.transition(state);
      }
    },
    [UNINITIALIZED]: {
      [LOAD_TRIPS]() {
        return store.dispatch(FETCH_DATA).then(this.handle.bind(this, RECEIVE_TRIPS));
      },
      [RECEIVE_TRIPS]() {
        this.handle(this.tripId ? SELECT_TRIP : LIST_TRIPS);
      },
      [SELECT_TRIP]: EXTRAS_SELECTION,
      [LIST_TRIPS]: TRIP_SELECTION,
      [INITIALIZE](tripId) {
        this.tripId = tripId;
        this.emit(TRIP_SET, tripId);
        this.handle(store.state.trips.length ? RECEIVE_TRIPS : LOAD_TRIPS);
      }
    },
    [TRIP_SELECTION]: {
      [SELECT_TRIP]({ tripId }) {
        this.tripId = tripId;
        this.emit(TRIP_SET, tripId);
        this.transition(EXTRAS_SELECTION);
      },
      [BOOK_NOW]({ tripId }) {
        this.tripId = tripId;
        this.emit(TRIP_SET, tripId);
        this.transition(PERSONAL_INFORMATION);
      }
    },
    [EXTRAS_SELECTION]: {
      [NEXT]: PERSONAL_INFORMATION,
      [SELECT_EXTRAS]({ extrasIds }) {
        store.commit(SET_TRIP_EXTRAS, { tripId: this.tripId, extrasIds });
        this.handle(NEXT);
      },
      [BACK]: TRIP_SELECTION,
    },
    [PERSONAL_INFORMATION]: {
      [SET_USER_INFO](data) {
        store.commit(SET_USER_INFO, data);
        this.handle(NEXT);
      },
      [NEXT]: RECAP,
      [BACK]: EXTRAS_SELECTION,
    },
    [RECAP]: {
      [NEXT]: PAYMENT,
      [BACK]: PERSONAL_INFORMATION,
    },
    [PAYMENT]: {
      [BACK]: RECAP,
      [PAY]() {
        this.emit(PROCESSING_PAYMENT);
        this.transition(LOADING);

        return store.dispatch(SUBMIT_TRIP_PAYMENT, this.tripId).then(() => {
          this.emit(PAYMENT_SUCCEDED);
          this.handle(LOADING_SUCCESS, CONFIRMATION);
        });
      },
      [ACCEPT_PAYMENT]: CONFIRMATION,
      [REJECT_PAYMENT]: PAYMENT,
    },
    [CONFIRMATION]: {}
  }
});
