<template>
    <div class="about" data-app>
      <Header/>
      <MainMenu active_item="about"/>
      <v-container class="bg-surface-variant">
        <v-row no-gutters>
          <v-col cols = "2">
          </v-col>
          <v-col cols = "8">
            <AboutInfo/>
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
  import AboutInfo from "../components/AboutInfo.vue"
  
  export default {
    name: 'Home',
    components: { Header, MainMenu, Footer, AboutInfo },
    data() {
        return {
        }
    },
    methods: {
    }
  }
</script>