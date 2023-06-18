<template>
    <v-dialog
        v-model="dialog_show"
        persistent
        width="300"
        >
        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                Change password
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="cur_password"
                                clearable
                                label="Password"
                                placeholder="Enter current password"
                                type = "password"
                                required = "true"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="new_password"
                                clearable
                                label="New assword"
                                placeholder="Enter new password"
                                type = "password"
                                required = "true"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="new_password2"
                                clearable
                                label="Repeat new password"
                                placeholder="Repeat new password"
                                type = "password"
                                required = "true"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
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
                <v-btn
                    text
                    @click="onCancelClicked()"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
  name: 'ChangePasswordDialog',
  data() {
    return{
        dialog_show: false,
        cur_password: "",
        new_password: "",
        new_password2: "",
    }
  },
  computed: {
  },
  props: {
  },
  methods: {
    showDialog(){
        this.dialog_show = true;
    },
    hideDialog(){
        this.dialog_show = false;
        this.cur_password = "";
        this.new_password = "";
        this.new_password2 = "";
    },
    onOkClicked(){
        let data = {
            cur_password: this.cur_password,
            new_password: this.new_password,
            new_password2: this.new_password2,
        };
        this.$emit("submit", data);
        this.hideDialog();
    },
    onCancelClicked(){
       this.hideDialog();
    },
  },
  watch:{
  },
}

</script>