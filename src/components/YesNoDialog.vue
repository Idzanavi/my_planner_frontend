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
          {{message}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="onYes()"
          >
            {{yes_text}}
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="onNo()"
          >
            {{no_text}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>

export default {
  name: 'YesNoDialog',
  data() {
    return{
        dialog_show: false,
    }
  },
  computed: {
  },
  props: {
    title: String,
    message: String,
    yes_text: {
      type: String,
      default: "Yes"
    },
    no_text: {
      type: String,
      default: "No"
    },
  },
  methods: {
    showDialog(){
        this.dialog_show = true;
    },
    hideDialog(){
        this.dialog_show = false;
    },
    onYes(){
        this.hideDialog();
        this.$emit("yes");
    },
    onNo(){
        this.hideDialog();
        this.$emit("no");
    },
  },
  watch:{
  },
}

</script>