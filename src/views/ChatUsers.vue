<template>
    <div class="chat-users" data-app>
        <Header/>
        <MainMenu active_item="chat"/>
        <v-container class="bg-surface-variant">
            <v-row no-gutters>
                <v-col cols = "2">
                </v-col>
                <v-col cols = "8">
                    <ChatUsersList/>
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
  import ChatUsersList from "../components/ChatUsersList.vue"
 
  import {is_logged_in} from '../js/server_utils';

  export default {
    name: 'ChatUsers',
    components: { Header, MainMenu, Footer, ChatUsersList },
    data() {
        return {
        }
    },
    methods: {
    },
    beforeCreate(){
        if(!is_logged_in(this.$store) ||  !this.$store.state.is_admin){
            this.$router.replace('/chat');
        }
    },
  }
</script>