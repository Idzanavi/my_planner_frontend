<template>
    <v-dialog
      v-model="dialog_show"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Login
        </v-card-title>

        <v-card>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model = "login"
                  clearable
                  label="Login"
                  placeholder="Enter login"
                  required = "true"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  clearable
                  label="Password"
                  placeholder="Enter password"
                  type = "password"
                  required = "true"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :loading="loading"
            text
            @click="onLoginClicked()"
          >
            Log In
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
  name: 'LoginDialog',
  data() {
    return{
        dialog_show: false,
        login: "",
        password: "",
        loading: false,
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
        this.login = "";
        this.password = "";
        this.loading = false;
    },
    stopLoading(){
        this.loading = false;
    },
    onLoginClicked(){
        this.loading = true;

        let data = {
            login: this.login,
            password: this.password,
        };
        this.$emit("submit", data);
    },
    onCancelClicked(){
       this.hideDialog();
    },
  },
  watch:{
  },
}

</script>