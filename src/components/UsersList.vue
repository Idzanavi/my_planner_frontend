<template>
    <div>
        <v-card>
            <v-list rounded>
                <v-list-item-group
                    color="primary"
                >
                    <v-list-item
                        v-for="(item, i) in items"
                        :key="'li_' + i"
                        @click="navigateToUser(item.pk)"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="item.username"></v-list-item-title>
                            <v-list-item-subtitle v-text="item.first_name + ' ' + item.last_name"></v-list-item-subtitle>
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
  name: 'UserList',
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
            let address = "api/users/";
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
                let num_items = data.results.length;
                let new_items = new Array(num_items);
                for(let i = 0; i < num_items; ++i){
                    new_items[i] = data.results[i].username;
                }
                this.items = data.results;

            }else{
                this.items = [];
            }
        }
    },
    onHttpError(error){
        console.log(error);
    },
    navigateToUser(id){
        this.$router.push("/user/" + id);
    }
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