import Vue from 'vue';
import Vuex from 'vuex';
import { fetchData } from '../api';

Vue.use(Vuex);

const initialState = {
    extras: [],
    trips: [],
    selectedExtrasIdsByTripId: {},
    userInfo: {
        firstName: undefined,
        lastName: undefined
    }
};

export const FETCH_DATA = 'FETCH_DATA';
const actions = {
    [FETCH_DATA]({ commit }) {
        fetchData().then(({ trips, extras }) => {
            commit(SET_TRIPS, trips);
            commit(SET_EXTRAS, extras);
        });
    }
};

export const SET_TRIPS = 'SET_TRIPS';
export const SET_EXTRAS = 'SET_EXTRAS';
export const ADD_USER_TRIP = 'ADD_USER_TRIP';
export const SET_TRIP_EXTRAS = 'SET_USER_TRIP_EXTRAS';
export const SET_USER_INFO = 'SET_USER_INFO';
const mutations = {
    [SET_TRIPS](state, trips) {
        state.trips = trips;
    },
    [SET_EXTRAS](state, extras) {
        state.extras = extras;
    },
    [SET_TRIP_EXTRAS](state, { tripId, extrasIds }) {
        state.selectedExtrasIdsByTripId[tripId] = extrasIds;
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
