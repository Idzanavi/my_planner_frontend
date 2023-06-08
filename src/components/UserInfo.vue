<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card-title v-if="isLoggedIn()">
            <b>{{this.user_name}} {{ getSelfUserTitle() }}</b>
          </v-card-title>
        </v-col>
      </v-row>
      <v-row dense no-gutters>
        <v-col cols="12">
          <v-card-text v-if="isLoggedIn()">
            {{ first_name }} {{ last_name }}
          </v-card-text>
        </v-col>
      </v-row>
      <v-row dense no-gutters>
        <v-col cols="12">
          <v-card-text v-if="isLoggedIn()">
            {{ email }}
          </v-card-text>
        </v-col>
      </v-row>
      <v-row dense no-gutters v-if="getGender()">
        <v-col cols="12">
          <v-card-text v-if="isLoggedIn()">
            {{ getGender() }}
          </v-card-text>
        </v-col>
      </v-row>
      <v-row dense no-gutters>
        <v-col cols="12">
          <v-card-text v-if="isLoggedIn()">
            {{ getBirthDateText() }}
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
  
<script>

import {dateFormat} from '../js/common.js';
import { is_logged_in, auth_get, is_cur_user } from '../js/server_utils';

export default {
  name: 'UserInfo',
  data() {
    return {
        genders: ["Male", "Female"],
        user_name: "",
        first_name: "",
        last_name: "",
        email: "",
        gender: 0,
        birth_date: null,
    }
  },
  computed: {
    loggedIn:{
      get: function(){
        return is_logged_in(this.$store);
      },
    },
  },
  props: {
    user_id: Number,
  },
  methods: {
    getUserId(){
      return this.user_id;
    },
    isCurUser(){
      return is_cur_user(this.$store, this.user_id);
    },
    getSelfUserTitle(){
      return this.isCurUser() ? " [You]" : "";
    },
    makeUserIdPath(){
      return this.isCurUser() ? "" : "" + this.getUserId() + "/";
    },
    handleHttpError(error){
      console.log(error.response.status);
    },
    getGender(){
      if(this.gender > 0 && this.gender <= 2){
        return this.genders[this.gender - 1];
      }else{
        return undefined;
      }
    },
    getBirthDateText(){ 
      return this.birth_date ? dateFormat(this.birth_date) : "";
    },
    isLoggedIn(){
        return is_logged_in(this.$store);
    },
    loadUserInfo(response){
      if(response.status == 200 && response.data){
        let data = response.data;
        this.user_name = data.username;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.birth_date = (data.birthdate !== undefined) ? new Date(Date.parse(data.birthdate)) : null;
        this.gender = data.gender;
      }
    },
    updateUser(){
      if(this.isLoggedIn()){
        let address = "api/user/" + this.makeUserIdPath();
        auth_get(this.$store, this.$http, address, this.loadUserInfo, this.handleHttpError);       
      }
    },
  },
  watch:{
    loggedIn:{
      immediate: true,
      handler(){
        this.updateUser();
      },
    },
  },
}
</script>