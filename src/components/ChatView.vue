<template>
    <div>
        <v-card-actions>
            <v-card-title>
                Room: [{{getRoomName()}}]
            </v-card-title>
            <v-switch
                v-model="show_notifications"
                label="Show system notifications"
                class="pl-5 pr-5"
            >
            </v-switch>
            <v-btn
                outlined
                @click="navigateToAllRooms"
            >
                Back to all Rooms
            </v-btn>
        </v-card-actions>

        <v-divider></v-divider>

        <v-virtual-scroll
            :items="getItems()"
            :item-height="50"
            height="350"
            id="items-scroller"
        >
            <template v-slot:default="{ item }">

                <v-card-actions v-if="item.type=='message'">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-list-item
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-list-item-avatar>
                                    <v-avatar
                                        :color="item.color"
                                        size="56"
                                        class="white--text"
                                    >
                                        {{ item.initials }}
                                    </v-avatar>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title><b>{{item.name}} </b><i>[{{item.time}}] </i>{{item.message}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <span>{{item.username}}</span>
                    </v-tooltip>
                </v-card-actions>

                <v-card-actions v-if="item.type=='event' && show_notifications">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-list-item
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-list-item-content :class="item.action">
                                    <v-list-item-title>
                                        <b>{{item.user}} </b><i>[{{item.time}}] </i>{{item.title}} ({{item.event_time}})
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <span>{{ item.action }}</span>
                    </v-tooltip>
                </v-card-actions>

            </template>
        </v-virtual-scroll>

        <v-divider></v-divider>

        <v-card-actions>
            <v-container>
                <v-row no-gutters>
                    <v-col cols="16">
                        <v-textarea
                            v-model="message_text"
                            outlined
                            clearable
                            rows="1"
                            auto-grow
                            hint="Message text"
                        >
                        </v-textarea>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="16">
                        <v-btn
                            outlined
                            color = "primary"
                            class="mr-5"
                            :disabled="isDisconnected()"
                            @click="onSendMessage"
                        >
                            Send
                        </v-btn>
                        <v-btn
                            outlined
                            color = "error"
                            class="mr-5"
                            @click="onClearChat"
                        >
                            Clear
                        </v-btn>
                        <v-btn
                            outlined
                            class="mr-5"
                            @click="onTryReconnect"
                        >
                            Reconnect
                        </v-btn>
                        <v-text-field
                            v-model="nickname"
                            label="Nickname"
                            clearable
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-actions>

        <InfoDialog
            ref = "error_dialog"
        >
        </InfoDialog>
        <YesNoDialog
            ref = "clear_dialog"
            title = "Are you sure to clear chat?"
            message = "All information will be deleted"
            @yes="clearChat"
        >
        </YesNoDialog>

    </div>
</template>

<style scoped>
  .ADD {
    background: #aaddaa;
  }
  .DELETE {
    background: #ffaaaa;
  }
  .UPDATE {
    background: #ffffaa;
  }
</style>

<script>

import InfoDialog from './InfoDialog.vue'
import YesNoDialog from './YesNoDialog.vue'


import {dateFromWeekDayNo, buildTimeLabel} from '../js/common.js';

import {make_full_address} from '../js/server_utils.js';

export default {
  name: 'ChatView',
  components: {InfoDialog, YesNoDialog, },
  data() {
    return {
        colors: ['#2196F3', '#90CAF9', '#64B5F6', '#42A5F5', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF', '#2962FF'],
        nickname: "",
        message_text: "",
        show_notifications: true,
        socket: undefined,
        items: [],
        user_colors: {},
        is_connected: false,
    }
  },
  computed: {
  },
  props: {
    room: String,
  },
  methods: {
    getRoomName(){
        return this.room;
    },
    getItems(){
        if(this.show_notifications){
            return this.items;
        }else{
            return this.items.filter(item => item.type == 'message');
        }
    },
    navigateToAllRooms(){
        this.$router.push("/chat");
    },
    onSendMessage(){
        if(this.message_text !== ""){
            const data = {
                'message': this.message_text,
                'nickname': this.nickname
            };
            this.socketSend(data);
            this.message_text = "";
        }
    },
    onClearChat(){
        this.$refs.clear_dialog.showDialog();
    },
    onTryReconnect(){
        this.createSocket(this.getRoomName());
    },
    clearChat(){
        this.items = [];
    },
    isDisconnected(){
        return !this.is_connected;
    },
    createSocket(room_name){
        const socket_address = make_full_address('ws/chat/' + room_name + '/', 'ws');
        this.socket = new WebSocket(socket_address);
        this.socket.onopen = this.onSocketOpen;
        this.socket.onmessage = this.onSocketMessage;
        this.socket.onclose = this.onSocketClose;
        this.socket.onerror = this.onSocketError;
    },
    onSocketOpen(event){
        console.log('Socket open');
        console.log(event);
        this.is_connected = true;
    },
    onSocketMessage(event){
        console.log(event);
        if(event.data){
            const data = JSON.parse(event.data);
            this.dispatchSocketData(data);
        }
    },
    onSocketClose(event){
        console.log('Socket close');
        console.log(event);
        this.$refs.error_dialog.showDialog("Disconnected", "Connection was closed");
        this.is_connected = false;
    },
    onSocketError(event){
        console.log('Socket error');
        console.log(event);
    },
    socketSend(data){
        this.socket.send(JSON.stringify(data));
    },
    dispatchSocketData(data){
        console.log(data);

        if(data.type === "message"){
            this.dispatchMessage(data);
        } else if (data.type === "event"){
            this.dispatchEvent(data);
        }
    },
    dispatchMessage(data){
        const message = data.message;
        const nickname = data.nickname;
        const username = data.user;
        const time = data.time;
        const anonymous = data.anonymous;
        const item = {
            name: this.makeDisplayedName(nickname, username, anonymous),
            username,
            initials: this.makeInitials(nickname, username, anonymous),
            time,
            message,
            color: this.getColorForUser(username),
            type: "message",
        };
        this.addItem(item);
    },
    dispatchEvent(data){
        const action = data.action; //ADD DELETE UPDATE
        const time = data.time;
        const user = data.user;
        const event_time = dateFromWeekDayNo(data.week, data.day) + " " + buildTimeLabel(data.slot);
        const title = data.title;
        const item = {
            action,
            time,
            user,
            event_time,
            title,
            type: "event",
        };
        this.addItem(item);
    },
    addItem(item){
        this.items.push(item);
    },
    getRandomColor(){
        return this.colors[Math.ceil(Math.random() * (this.colors.length - 1))];
    },
    getColorForUser(username){
        if(username in this.user_colors){
            return this.user_colors[username];
        }else{
            let color = this.getRandomColor();
            this.user_colors[username] = color;
            return color;
        }
    },
    makeInitials(nickname, username, anonymous){
        if(nickname !== "" && nickname.length > 0){
            return nickname[0].toUpperCase(); 
        }else if(!anonymous){
            return username[0].toUpperCase();
        }else{
            return "?";
        }
    },
    makeDisplayedName(nickname, username, anonymous){
        if(nickname !== ""){
            return nickname;
        }else if(!anonymous){
            return username;
        }else{
            return "Anonymous";
        }
    },
  },
  watch:{
  },
  mounted(){
    this.createSocket(this.getRoomName());
  }
}

</script>