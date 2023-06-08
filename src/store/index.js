import Vue from 'vue'
import Vuex from 'vuex'

import {weekNo} from '../js/common.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token: null,
    refresh_token: null,

    active_week_no: weekNo(new Date()),
    start_week_no: weekNo(new Date()) - 7,
    cur_user_id: null,
    is_admin: null,
  },
  mutations: { // cannot be asynchronous! (always sync)
    SET_ACCESS_TOKEN: (state, token) => {
      state.access_token = token;
    },
    SET_REFRESH_TOKEN: (state, token) => {
      state.refresh_token = token;
    },
    SET_ACTIVE_WEEK_NO: (state, new_week_no) => {
      state.active_week_no = new_week_no;
    },
    SET_START_WEEK_NO: (state, new_week_no) => {
      state.start_week_no = new_week_no;
    },
    SET_CUR_USER_ID: (state, uid) => {
      state.cur_user_id = uid;
    },
    SET_ADMIN: (state, is_admin) => {
      state.is_admin = is_admin;
    },
  },
  actions: {
    SET_ACCESS_TOKEN: (context, token) => {
      context.commit('SET_ACCESS_TOKEN', token);
    },
    SET_REFRESH_TOKEN: (context, token) => {
      context.commit('SET_REFRESH_TOKEN', token);
    },
    SET_ACTIVE_WEEK_NO: (context, new_week_no) => {
      context.commit('SET_ACTIVE_WEEK_NO', new_week_no);
    },
    SET_START_WEEK_NO: (context, new_week_no) => {
      context.commit('SET_START_WEEK_NO', new_week_no);
    },
    SET_CUR_USER_ID: (context, uid) => {
      context.commit('SET_CUR_USER_ID', uid);
    },
    SET_ADMIN: (context, is_admin) => {
      context.commit('SET_ADMIN', is_admin);
    },
  },
  getters: {
    accessToken(state){
      return state.access_token;
    },
    refreshToken(state){
      return state.refresh_token;
    },
  },
  modules: {
  }
})
