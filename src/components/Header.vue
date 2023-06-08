<template>
  <div>
    <v-system-bar color="#0F0A30">
      <v-spacer></v-spacer>
      
      <v-chip 
        v-if="isLoggedIn()"
        color="#0F0A30"
        text-color="#F0F0A0"
        @click="onLogOutClicked()"
      >
        Log out
      </v-chip>
      
      <v-chip
        v-if="!isLoggedIn()"
        color="#0F0A30"
        text-color="#F0F0A0"
        @click="onRegisterClicked()"
      >
        Register
      </v-chip>

      <v-chip
        v-if="!isLoggedIn()"
        color="#0F0A30"
        text-color="#F0F0A0"
        @click="onLogInClicked()"
      >
        Log in
      </v-chip>
    </v-system-bar>
    
    <v-toolbar
      dark
      prominent
      src="/banner.jpg"
    >
      <v-img
        max-height="100"
        max-width="100"
        src="/logo.png"
      ></v-img>
      <v-card-title>
        <v-toolbar-title>My Planner</v-toolbar-title>
      </v-card-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <YesNoDialog
      ref="logout_dialog"
      title="Are you sure to Log Out?"
      text="You will Log out from system"
      @yes="logout"
    >
    </YesNoDialog>

    <InfoDialog ref="error_dialog"></InfoDialog>
    <LoginDialog ref="login_dialog" @submit="tryLogin"></LoginDialog>

  </div>
</template>

<script>

import YesNoDialog from './YesNoDialog.vue';
import InfoDialog from './InfoDialog.vue';
import LoginDialog from './LoginDialog.vue';

import {fieldsToText} from '../js/common.js';
import {make_full_address, is_logged_in, do_logout, update_curuser_id, set_access_token, set_refresh_token} from '../js/server_utils.js';

export default {
  name: 'Header',
  components: { YesNoDialog, InfoDialog, LoginDialog, },
  data() {
    return {
    }
  },
  computed: {
    },
  props: {
  },
  methods: {
    onLogOutClicked(){
      this.$refs.logout_dialog.showDialog();
    },
    onRegisterClicked(){
      this.$router.push({ path: '/register' });
    },
    onLogInClicked(){
      this.$refs.login_dialog.showDialog();
    },
    tryLogin(login_data){
      this.$http.post(make_full_address("api/token/"), {'username': login_data.login, 'password': login_data.password}).then(this.dispatchLoginResponse).catch(this.dispatchLoginError);
    },
    dispatchLoginResponse(response)
    {
      if(response.status == 200 && 'data' in response){
        let data = response.data;
        if('access' in data && 'refresh' in data){
          set_access_token(this.$store, data.access);
          set_refresh_token(this.$store, data.refresh);
          this.$refs.login_dialog.hideDialog();
          update_curuser_id(this.$store, this.$http, this.goToMain);
          return;
        }
      }
      
      let error_msg = "[" + response.status + "]";
      if('data' in response){
        error_msg += ": " + fieldsToText(response.data);
      }

      this.$refs.error_dialog.showDialog("Error", error_msg);
      this.$refs.login_dialog.stopLoading();
    },
    goToMain(){
      this.$router.push('/');
    },
    dispatchLoginError(error){
      let error_msg = "";
      if (error.response){
        error_msg += "[" + error.response.status + "]";
        if('data' in error.response){
          error_msg += ": " + fieldsToText(error.response.data);
        }
      } else if (error.request){
        error_msg += ": " + fieldsToText(error.request);
      } else {
        error_msg += error.message;
      }

      this.$refs.error_dialog.showDialog("Error", error_msg);
      this.$refs.login_dialog.stopLoading();
    },
    logout(){
      do_logout(this.$store);
      this.$router.go(this.$router.currentRoute)
    },
    isLoggedIn(){
      return is_logged_in(this.$store);
    }

  },
}
</script>