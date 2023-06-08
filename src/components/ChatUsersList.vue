<template>
  <div>
      <v-card-actions>
        <v-btn
          outlined
          @click="loadPage"
        >
          Reload
        </v-btn>
      </v-card-actions>
      <v-card>
          <v-list rounded>
              <v-list-item-group
                  color="primary"
              >
                  <v-list-item
                      v-for="(item, i) in items"
                      :key="'li_' + i"
                  >
                      <v-list-item-content>
                          <v-list-item-title v-text="item.username"></v-list-item-title>
                          <v-list-item-subtitle v-text="'Connected: ' + item.connected_time"></v-list-item-subtitle>
                          <v-list-item-subtitle>{{getStatus(item)}}</v-list-item-subtitle>
                      </v-list-item-content>
                  </v-list-item>
              </v-list-item-group>
          </v-list>
      </v-card>

      <div class="text-center">
          <v-container>
              <v-row justify="center">
                  <v-col cols="8">
                      <v-container class="max-width">
                          <v-pagination
                              v-model="page"
                              :length="pages"
                              circle
                          >
                          </v-pagination>
                      </v-container>
                  </v-col>
              </v-row>
          </v-container>
      </div>
  </div>
</template>


<script>

import { is_logged_in, auth_get } from '../js/server_utils';

export default {
  name: 'ChatUsersList',
  components: {},
  data() {
    return {
      page: undefined,
      pages: undefined,
      items: [],
    }
  },
  computed: {
  },
  props: {
  },
  methods: {
    isLoggedIn(){
        return is_logged_in(this.$store);
    },
    makePageParams(){
        if(this.page !== undefined){
            return {page: this.page};
        }else{
            return {};
        }
    },
    loadPage(){
        if(this.isLoggedIn()){
            let address = "chat/api/users/";
            auth_get(this.$store, this.$http, address, this.updateUsersFromResponse, this.onHttpError, this.makePageParams());
        }
    },
    updateUsersFromResponse(response){
        if(response.data){
            let data = response.data;
            if(data.page){
                this.page = data.page;
            }
            if(data.pages){
                this.pages = data.pages;
            }
            if(data.results){
                this.items = data.results;

            }else{
                this.items = [];
            }
        }
    },
    onHttpError(error){
        console.log(error);
    },
    getStatus(item){
      if(item.anonymous){
        return "Anonymous";
      }else{
        return "User";
      }
    },
  },
  watch:{
    page(new_page, old_page) {
        if(new_page != old_page){
            this.loadPage();
        }
    }
  },
  mounted(){
    this.loadPage();
  }
}

</script>