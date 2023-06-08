<template>
    <div class="users" data-app>
      <Header/>
      <MainMenu active_item="users"/>
      <v-container class="bg-surface-variant">
        <v-row no-gutters>
          <v-col cols = "2">
          </v-col>
          <v-col cols = "8">
            <UsersList/>
          </v-col>
          <v-col cols = "2">
          </v-col>
        </v-row>
      </v-container>
      <Footer/>
    </div>
</template>
  
<script>
  
  import Header from '../components/Header.vue'
  import MainMenu from '../components/MainMenu.vue'
  import Footer from "../components/Footer.vue"
  import UsersList from "../components/UsersList.vue"
  
  import {is_logged_in, update_curuser_id} from '../js/server_utils';

  export default {
    name: 'Home',
    components: { Header, MainMenu, Footer, UsersList },
    data() {
        return {
        }
    },
    methods: {
    },
    beforeCreate(){
      if(!is_logged_in(this.$store)){
        this.$router.replace('/about');
      }
      if(this.$store.state.cur_user_id === null){
        update_curuser_id(this.$store, this.$http);
      }
    },
  }
</script>