<template>
    <div class="register">
      <Header/>
      <MainMenu active_item=""/>
      <v-container class="bg-surface-variant">
        <v-row no-gutters>
          <v-col cols = "2">
          </v-col>
          <v-col cols = "8">
            <RegisterUser/>
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
  import RegisterUser from "../components/RegisterUser.vue"
  
  export default {
    name: 'Home',
    components: { Header, MainMenu, Footer, RegisterUser },
    data() {
        return {
        }
    },
  
    methods: {
    }
  }
</script>