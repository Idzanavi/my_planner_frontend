<template>
    <div>
        <v-card class="mx-auto" outlined>
            <v-card>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="username" label="User name" clearable>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="email" label="Email" clearable placeholder="johndoe@gmail.com"
                                type="email">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="password" clearable label="Password" placeholder="Enter password"
                                type="password" required="true">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="password2" clearable label="Repeat Password"
                                placeholder="Repeat password" type="password" required="true">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
            <v-card-actions>
                <v-btn outlined rounded text color="primary" @click="onRegisterClicked()">
                    Register
                </v-btn>
            </v-card-actions>
        </v-card>

        <InfoDialog ref="error_dialog"></InfoDialog>
        <InfoDialog ref="success_dialog" @ok="onSuccessOkClicked"></InfoDialog>

    </div>
</template>


<script>

import InfoDialog from './InfoDialog.vue'

import { make_full_address } from '../js/server_utils';
import { fieldsToText } from '../js/common'

export default {
    name: 'EditUser',
    components: { InfoDialog, },
    data() {
        return {
            username: "",
            email: "",
            password: "",
            password2: "",
        }
    },
    computed: {
    },
    props: {
    },
    methods: {
        onRegisterClicked() {
            let adderss = make_full_address("api/register/");
            let data = {
                username: this.username,
                email: this.email,
                password: this.password,
                password2: this.password2,
            };
            this.$http.post(adderss, data).then(this.onRegistered).catch(this.onRegistrationError);
        },
        onRegistered() {
            this.$refs.success_dialog.showDialog("Success", "Successfully registered");
        },
        onRegistrationError(error) {
            this.$refs.error_dialog.showDialog("Error", fieldsToText(error.response.data));
        },
        onSuccessOkClicked() {
            this.$router.push("/about");
        }
    },
    watch: {
    },
}
</script>