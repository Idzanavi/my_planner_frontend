<template>
    <div>
        <v-card-actions>
            <v-card-title>
                Tasks
            </v-card-title>
        </v-card-actions>

        <v-card-actions>
            <v-btn
                outlined
                color = "primary"
                class="mr-5"
                @click="requestPrettify"
            >
                Prettify my items
            </v-btn>
            <v-btn
                outlined
                v-if="isAdmin()"
                class="mr-5"
                @click="toTasksLog"
            >
                Show tasks log
            </v-btn>
            <v-btn
                outlined
                v-if="isAdmin()"
                class="mr-5"
                color = "error"
                @click="notifyUsersRequest"
            >
                Notify users
            </v-btn>
        </v-card-actions>

        <InfoDialog
            ref = "info_dialog"
        >
        </InfoDialog>

    </div>
</template>


<script>

import InfoDialog from './InfoDialog.vue'

import {is_logged_in, auth_get} from '../js/server_utils';

export default {
  name: 'TaskView',
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
    isLoggedIn(){
        return is_logged_in(this.$store);
    },
    isAdmin(){
        return this.$store.state.is_admin;
    },
    requestPrettify(){
        if(this.isLoggedIn()){
            const address = "tasks/api/prettify/";
            auth_get(this.$store, this.$http, address, this.taskResponse, this.handleHttpError);
        }
    },
    notifyUsersRequest(){
        if(this.isLoggedIn() && this.isAdmin()){
            const address = "tasks/api/sendmail/";
            auth_get(this.$store, this.$http, address, this.taskResponse, this.handleHttpError);
        }
    },
    taskResponse(response){
        if(response.data && response.data.task_id){
            this.$refs.info_dialog.showDialog("Task started successfully", "Task ID: " + response.data.task_id);
        }
    },
    toTasksLog(){
        this.$router.push('/tasks');
    },
    handleHttpError(error){
        console.log(error);
    },
  },
  watch:{
  },
}

</script>