import Vue from 'vue';
import Vuex from 'vuex';
import { fetchData, submitPayment } from '../api';

Vue.use(Vuex);

const initialState = {
    extras: [],
    trips: [],
    selectedExtrasIdsByTripId: {},
    paymentStatusByTripId: {},
    userInfo: {
        firstName: undefined,
        lastName: undefined
    }
};

export const FETCH_DATA = 'FETCH_DATA';
export const SUBMIT_TRIP_PAYMENT = 'SUBMIT_TRIP_PAYMENT';
const actions = {
    [FETCH_DATA]({ commit }) {
        fetchData().then(({ trips, extras }) => {
            commit(SET_TRIPS, trips);
            commit(SET_EXTRAS, extras);
        });
    },
    [SUBMIT_TRIP_PAYMENT]({ commit }, tripId) {
        commit(SET_TRIP_PAYMENT_STATUS, { tripId, status: { code: 0 }});
        return submitPayment().then(() => {
            commit(SET_TRIP_PAYMENT_STATUS, { tripId, status: { code: 1 }});
        }).catch(err => {
            commit(SET_TRIP_PAYMENT_STATUS, { tripId, status: { code: -1, msg: err }});
        });

    }
};

export const SET_EXTRAS = 'SET_EXTRAS';
export const SET_TRIP_EXTRAS = 'SET_USER_TRIP_EXTRAS';
export const SET_TRIPS = 'SET_TRIPS';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_TRIP_PAYMENT_STATUS = 'SET_TRIP_PAYMENT_STATUS';
const mutations = {
    [SET_TRIP_PAYMENT_STATUS](state, { tripId, status }) {
        state.paymentStatusByTripId = Object.assign({},
            state.paymentStatusByTripId,
            { [tripId]: status }
        );
    },
    [SET_TRIPS](state, trips) {
        state.trips = trips;
    },
    [SET_EXTRAS](state, extras) {
        state.extras = extras;
    },
    [SET_TRIP_EXTRAS](state, { tripId, extrasIds }) {
        state.selectedExtrasIdsByTripId = Object.assign({},
            state.selectedExtrasIdsByTripId,
            { [tripId]: extrasIds }
        );
    },
    [SET_USER_INFO](state, { firstName, lastName }) {
        Object.assign(state.userInfo, { firstName, lastName });
    }
};

const getters = {
    tripsById(state) {
        return state.trips.reduce((acc, trip) => {
            return Object.assign(acc, { [trip.id]: trip });
        }, {});
    },
    extrasById(state) {
        return state.extras.reduce((acc, extra) => {
            return Object.assign(acc, { [extra.id]: extra });
        }, {});
    }
};

export default new Vuex.Store({
    state: initialState,
    actions,
    mutations,
    getters
});
