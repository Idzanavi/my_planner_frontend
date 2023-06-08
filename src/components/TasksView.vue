<template>
    <div>
        <v-card-actions>
            <v-card-title>
                Tasks
            </v-card-title>
        </v-card-actions>

        <v-divider></v-divider>

        <v-virtual-scroll
            :items="items"
            :item-height="50"
            height="450"
            id="items-scroller"
        >

            <template v-slot:default="{ item }">

                <v-card-actions>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item>
                                <v-container>
                                    <v-row no-gutters>
                                        <v-col>
                                            <b>{{item.name}}</b>
                                        </v-col>
                                        <v-col>
                                            {{item.input}}
                                        </v-col>
                                        <v-col>
                                            {{item.output}}
                                        </v-col>
                                        <v-col>
                                            <i>{{item.finished}}</i>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-list-item>
                        </v-list-item-content>
                    </v-list-item>
                </v-card-actions>

            </template>
        </v-virtual-scroll>

        <v-divider></v-divider>

        <InfoDialog
            ref = "error_dialog"
        >
        </InfoDialog>

    </div>
</template>


<script>

import InfoDialog from './InfoDialog.vue'

import {make_full_address} from '../js/server_utils.js';

export default {
  name: 'TasksView',
  components: {InfoDialog, },
  data() {
    return {
        socket: undefined,
        items: [],
        is_connected: false,
    }
  },
  computed: {
  },
  props: {
  },
  methods: {
    isDisconnected(){
        return !this.is_connected;
    },
    createSocket(){
        const socket_address = make_full_address('ws/tasks/', 'ws');
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
    dispatchSocketData(data){
        console.log(data);
        this.addItem(data);
    },
    addItem(item){
        this.items.push(item);
    },
  },
  watch:{
  },
  mounted(){
    this.createSocket();
  }
}

</script>