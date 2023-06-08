<template>
    <div class="chat" data-app>
        <Header/>
        <MainMenu active_item="chat"/>
        <v-container class="bg-surface-variant">
            <v-row no-gutters>
                <v-col cols = "2">
                </v-col>
                <v-col cols = "8">
                    <ChatView :room="getRoomName()"/>
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
  import ChatView from "../components/ChatView.vue"
  
  export default {
    name: 'Chat',
    components: { Header, MainMenu, Footer, ChatView },
    data() {
        return {
            room: undefined,
        }
    },
    methods: {
        getRoomName(){
            return this.room = this.$route.params.room;
        },
    },
    beforeCreate(){
      if(this.$route.params.room !== undefined){
        this.room = this.$route.params.room;
      } else {
        this.$router.push('/chat');
      }
    },
  }
</script>