<template>
    <div>

        <v-card
            class="mx-auto"
            outlined
        >
            <v-card-title>
                <h3>Edit profile</h3>
            </v-card-title>    
            <v-card-title>
                <h4>{{ user_name }}</h4>
            </v-card-title>
            <v-card>
                <v-container>
                    <v-row dense>
                        <v-col cols="8">
                            <v-container>
                                <v-row dense>
                                    <v-col>
                                        <v-text-field
                                            v-model = "email"
                                            label="Email"
                                            clearable
                                            placeholder="johndoe@gmail.com"
                                            type="email"
                                        >
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col>
                                        <v-text-field
                                            v-model = "first_name"
                                            label="First name"
                                            clearable
                                        >
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col>
                                        <v-text-field
                                            v-model = "last_name"
                                            label="Last name"
                                            clearable
                                        >
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col>
                                        <v-select
                                            :items="genders"
                                            label="Gender"
                                            item-text="text"
                                            item-value="id"
                                            v-model="gender"
                                        >
                                        </v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-col>
                        <v-col>
                            <v-date-picker
                                v-model="birth_date"
                                color="green lighten-1"
                                header-color="primary"
                            >
                            </v-date-picker>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
            <v-card-actions>
                <v-btn
                    outlined
                    rounded
                    text
                    @click="updateUser()"
                >
                    Reset
                </v-btn>
                <v-btn
                    outlined
                    rounded
                    text
                    color="primary"
                    @click="editUser()"
                >
                    Save
                </v-btn>
                <v-btn
                    outlined
                    rounded
                    text
                    color="error"
                    @click="onChangePasswordClicked()"
                >
                    Change Password
                </v-btn>
            </v-card-actions>
        </v-card>

        <InfoDialog ref="info_dialog"></InfoDialog>
        <ChangePasswordDialog ref="change_password_dialog" @submit="onPasswordChangeSubmitted"></ChangePasswordDialog>

    </div>
</template>


<script>

import InfoDialog from './InfoDialog.vue'
import ChangePasswordDialog from './ChangePasswordDialog.vue';

import {dateFormat, fieldsToText} from '../js/common.js';
import { is_logged_in, auth_get, auth_patch, auth_post } from '../js/server_utils';

export default {
  name: 'EditUser',
  components: { InfoDialog, ChangePasswordDialog, },
  data() {
    return {
        genders: [
            {
                id: 0,
                text: "",
            },
            {
                id: 1,
                text: "Male",
            },
            {
                id: 2,
                text: "Female",
            },
        ],
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
    isLoggedIn(){
        return is_logged_in(this.$store);
    },
    updateUserFromResponse(response){
        if(response.status == 200 && response.data){
            let data = response.data;
            this.user_name = data.username;
            this.first_name = data.first_name;
            this.last_name = data.last_name;
            this.email = data.email;
            let birth_date = (data.birthdate !== undefined) ? new Date(Date.parse(data.birthdate)) : new Date();
            this.birth_date = dateFormat(birth_date);
            this.gender = data.gender;
        }
    },
    updateUser(){
      if(this.isLoggedIn()){
        let address = "api/user/";
        auth_get(this.$store, this.$http, address, this.updateUserFromResponse, this.onRequestError);
      }
    },
    editUser(){
        if(this.isLoggedIn()){
            let address = "api/user/";
            let data = {
                email: this.email,
                first_name: this.first_name,
                last_name: this.last_name,
                birthdate: this.birth_date,
                gender: this.gender,
            };
            auth_patch(this.$store, this.$http, address, data, this.onSuccessfullyEdited, this.onRequestError);
        }
    },
    onSuccessfullyEdited(response){
        this.updateUserFromResponse(response);
        this.$refs.info_dialog.showDialog("Success", "Information successfully updated");
    },
    onChangePasswordClicked(){
        this.$refs.change_password_dialog.showDialog();
    },
    onPasswordChangeSubmitted(event_data){
        if(event_data.new_password != event_data.new_password2){
            this.$refs.info_dialog.showDialog("Error", "New passwords should be equal");
            return;
        }

        let address = "api/change-pwd/";
        let data = {
            current_password: event_data.cur_password,
            new_password: event_data.new_password
        };
        auth_post(this.$store, this.$http, address, data, this.onPasswordChanged, this.onRequestError);
    },
    onPasswordChanged(){
        this.$refs.change_password_dialog.hideDialog();
        this.$refs.info_dialog.showDialog("Success", "Password successfully changed");
    },
    onRequestError(error){
        this.$refs.info_dialog.showDialog("Error", fieldsToText(error.response.data));
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