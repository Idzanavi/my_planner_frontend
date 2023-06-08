<template>
    <div>
        <v-list rounded>
            <v-subheader>Actions</v-subheader>
            <v-list-item-group
                color="primary"
            >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title
                            @click="onThisWeekClicked()"
                        >
                            This week
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title
                            @click="onFirstWeekClicked()"
                        >
                            First week
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title
                            @click="onLastWeekClicked()"
                        >
                            Last week
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="isLoggedIn() && isCurUser()">
                    <v-list-item-content>
                        <v-list-item-title
                            @click="onClearWeekClicked()"
                        >
                            Clear week
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>

import {weekNo} from '../js/common.js';
import { is_logged_in, auth_get, is_cur_user } from '../js/server_utils';

export default {
  name: 'ActionsMenu',
  data() {
    return {
        is_logged_in: true,
    }
  },
  computed: {
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
    makeUserIdPath(){
      return this.isCurUser() ? "" : "" + this.getUserId() + "/";
    },
    handleHttpError(error){
      console.log(error.response.status);
    },
    isLoggedIn(){
      return is_logged_in(this.$store);
    },
    onThisWeekClicked(){
        this.$store.dispatch('SET_ACTIVE_WEEK_NO', weekNo(new Date()));
        this.$store.dispatch('SET_START_WEEK_NO', weekNo(new Date()) - 7);
    },
    onFirstWeekClicked(){
        if(this.isLoggedIn()){
            let address = "api/first-week/" + this.makeUserIdPath();
            auth_get(this.$store, this.$http, address, response => {
            if(response.status == 200 && response.data){
                let data = response.data;
                if(data.week_no){
                    let week_no = data.week_no;
                    this.$store.dispatch('SET_ACTIVE_WEEK_NO', week_no);
                    this.$store.dispatch('SET_START_WEEK_NO', week_no);                   
                }
            }
        }, this.handleHttpError);       
      }
    },
    onLastWeekClicked(){
        if(this.isLoggedIn()){
            let address = "api/last-week/" + this.makeUserIdPath();
            auth_get(this.$store, this.$http, address, response => {
            if(response.status == 200 && response.data){
                let data = response.data;
                if(data.week_no){
                    let week_no = data.week_no;
                    this.$store.dispatch('SET_ACTIVE_WEEK_NO', week_no);
                    this.$store.dispatch('SET_START_WEEK_NO', week_no - 14);                   
                }
            }
        }, this.handleHttpError);       
      }
    },
    onClearWeekClicked(){
        this.$emit('clear_week');
    }
  },
}
</script>