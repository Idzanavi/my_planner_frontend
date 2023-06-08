<template>
    <v-dialog
      v-model="dialog_show"
      persistent
      width="400"
    >
        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                {{dialog_title}}
            </v-card-title>

            <v-card-text>
                {{dialog_message}}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="onOkClicked()"
                >
                    Ok
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
  name: 'InfoDialog',
  data() {
    return{
        dialog_show: false,
        dialog_title: "",
        dialog_message: "",
    }
  },
  computed: {
  },
  props: {
    title: String,
    message: String,
  },
  methods: {
    showDialog(title = null, message = null){
        this.dialog_title = (title !== null) ? title : this.title;
        this.dialog_message = (message !== null) ? message : this.message;
        this.dialog_show = true;
    },
    onOkClicked(){
        this.dialog_show = false;
        this.dialog_title = "";
        this.dialog_message = "";
        this.$emit("ok");
    },
  },
  watch:{
  },
}

</script>