<template>
    <div class="tasks" data-app>
        <Header/>
        <MainMenu active_item="task"/>
        <v-container class="bg-surface-variant">
            <v-row no-gutters>
                <v-col cols = "2">
                </v-col>
                <v-col cols = "8">
                    <TasksView/>
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
  import TasksView from "../components/TasksView.vue"

  import {is_logged_in, update_is_admin} from '../js/server_utils';
  
  export default {
    name: 'Tasks',
    components: { Header, MainMenu, Footer, TasksView },
    data() {
        return {
        }
    },
    methods: {
    },
    beforeCreate(){
        if(is_logged_in(this.$store)){
            if(this.$store.state.is_admin === null){
                update_is_admin(this.$store, this.$http);
            }
        }
        if(!is_logged_in(this.$store) ||  !this.$store.state.is_admin){
            this.$router.replace('/task');
        }
    },
  }
</script>