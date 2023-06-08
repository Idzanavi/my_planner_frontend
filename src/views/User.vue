<template>
    <div class="user" data-app>
      <Header/>
      <MainMenu :active_item="getMainMenuItem()"/>
      <v-container class="bg-surface-variant">
        <v-row no-gutters>
          <v-col cols = "2">
            <UserInfo :user_id="user_id"/>
            <ActionsMenu :user_id="user_id" @clear_week="onClearWeek()"/>
          </v-col>
          <v-col cols = "8">
            <PlannerTable :user_id="user_id" ref="planner_table"/>
          </v-col>
          <v-col cols = "2">
            <Navigator/>
          </v-col>
        </v-row>
      </v-container>
      <Footer/>
    </div>
  </template>
  
  <script>
  
  import Header from '../components/Header.vue'
  import PlannerTable from '../components/PlannerTable.vue'
  import Navigator from '../components/Navigator.vue'
  import UserInfo from '../components/UserInfo.vue'
  import MainMenu from '../components/MainMenu.vue'
  import ActionsMenu from '../components/ActionsMenu.vue'
  import Footer from "../components/Footer.vue"
  
  import {is_logged_in, update_curuser_id, is_cur_user} from '../js/server_utils';
  
  export default {
    name: 'User',
    components: { Header, PlannerTable, Navigator, UserInfo, MainMenu, ActionsMenu, Footer },
    user_id: undefined,
    data() {
        return {
        }
    },
    methods: {
        onClearWeek(){
            this.$refs.planner_table.clearThisWeek();
        },
        getMainMenuItem(){
            return is_cur_user(this.$store, this.user_id) ? "main" : "";
        }
    },
    beforeCreate(){
      if(!is_logged_in(this.$store)){
        this.$router.replace('/about');
      }
      if(this.$store.state.cur_user_id === null){
            update_curuser_id(this.$store, this.$http);
      }
      if(this.$route.params.id !== undefined){
        this.user_id = parseInt(this.$route.params.id);
      } else {
        this.user_id = this.$store.state.cur_user_id;
      }
    },
  }
  </script>