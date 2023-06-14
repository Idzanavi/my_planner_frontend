<template>
    <div>
        <v-card-title>
            Chat rooms
        </v-card-title>
        <v-card-actions>
            <v-container class="bg-surface-variant">
                <v-row no-gutters>
                    <v-col cols = "6">
                        <v-text-field
                            v-model="room_name"
                            label="Room name"
                            clearable
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols = "1">
                    </v-col>
                    <v-col>
                        <v-btn
                            outlined
                            @click="createRoom"
                        >
                            Create or join
                        </v-btn>
                    </v-col>
                    <v-col v-if="isAdmin()">
                        <v-btn
                            outlined
                            color ="error"
                            @click="viewChatUsers"
                        >
                            View Chat Users
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-actions>
        <v-card>
            <v-list rounded>
                <v-list-item-group
                    color="primary"
                >
                    <v-list-item
                        v-for="(room, i) in rooms"
                        :key="'li_' + i"
                        @click="navigateToRoom(room.name)"
                    >
                        <v-list-item-content>
                            <v-list-item-title></v-list-item-title>
                            <b>{{room.name}}</b> ({{room.guests}} guests)
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

        <InfoDialog
            ref = "error_dialog"
        >
        </InfoDialog>
    </div>
</template>


<script>

import InfoDialog from './InfoDialog.vue'

import {make_full_address} from '../js/server_utils';

export default {
  name: 'ChatsView',
  components: {InfoDialog, },
  data() {
    return {
      page: undefined,
      pages: undefined,
      rooms: [],
      room_name: "",
    }
  },
  computed: {
  },
  props: {
  },
  methods: {
    makePageAddr(){
        if(this.page !== undefined){
            return "" + this.page + "/";
        }else{
            return "";
        }
    },
    makePageParams(){
        if(this.page !== undefined){
            return {page: this.page};
        }else{
            return {};
        }
    },
    loadPage(){
        let address = "chat/api/rooms/";
        let params = this.makePageParams();
        this.$http.get(make_full_address(address), {params}).then(this.updateChatsFromResponse).catch(this.onHttpError);
    },
    isAdmin(){
        return this.$store.state.is_admin;
    },
    updateChatsFromResponse(response){
        if(response.data){
            let data = response.data;
            if(data.page){
                this.page = data.page;
            }
            if(data.pages){
                this.pages = data.pages;
            }
            if(data.results){
                this.rooms = data.results;
            }else{
                this.rooms = [];
            }
        }
    },
    onHttpError(error){
        console.log(error);
    },
    createRoom(){
        const room_name = this.room_name.trim();
        if(room_name === ""){
            this.$refs.error_dialog.showDialog("Error", "Room name can't be empty");
        }else{
            this.navigateToRoom(room_name);
        }
    },
    navigateToRoom(room){
        this.$router.push("/chat/" + room);
    },
    viewChatUsers(){
        this.$router.push("/chat-users");
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