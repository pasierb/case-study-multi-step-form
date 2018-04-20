import Vue from 'vue';
import Vuex from 'vuex';
import { fetchData } from '../api';

Vue.use(Vuex);

const initialState = {
    extras: [],
    trips: [],
    userTripsById: {},
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
export const SET_USER_TRIP_EXTRAS = 'SET_USER_TRIP_EXTRAS';
export const SET_USER_INFO = 'SET_USER_INFO';
const mutations = {
    [SET_TRIPS](state, trips) {
        state.trips = trips;
    },
    [SET_EXTRAS](state, extras) {
        state.extras = extras;
    },
    [ADD_USER_TRIP](state, trip) {
        if (!state.userTripsById[trip.id]) {
            state.userTripsById[trip.id] = {
                extrasIds: []
            }
        }
    },
    [SET_USER_TRIP_EXTRAS](state, { tripId, extrasIds }) {
        state.userTripsById[tripId].extrasIds = extrasIds;
    },
    [SET_USER_INFO](state, { firstName, lastName }) {
        Object.assign(state.userInfo, { firstName, lastName });
    }
};

const getters = {};

export default new Vuex.Store({
    state: initialState,
    actions,
    mutations,
    getters
});
