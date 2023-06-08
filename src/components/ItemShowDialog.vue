<template>
    <v-dialog
        v-model="dialog_show"
        persistent
        width="600"
    >
        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                {{title}}
            </v-card-title>
            <v-card-text>
                {{text}}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="onOkClicked"
                >
                    OK
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
        title: "",
        text: "",
    }
  },
  computed: {
  },
  props: {
  },
  methods: {
    showDialog(title, text){
        this.title = title;
        this.text = text;
        this.dialog_show = true;
    },
    onOkClicked(){
        this.dialog_show = false;
        this.title = "";
        this.text = "";
    },
  },
  watch:{
  },
}

</script>