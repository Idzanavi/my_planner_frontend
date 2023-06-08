<template>
    <v-container class="bg-surface-variant">
      <v-row>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-col>
                <v-slide-group
                    show-arrows
                >
                    <v-slide-item>
                    <v-btn
                        class="mx-2"
                        :input-value="active_item == 'main'"
                        active-class="purple white--text"
                        depressed
                        rounded
                        @click="onMyPlannerClicked()"
                    >
                        My Planner
                    </v-btn>
                    </v-slide-item>
                    <v-slide-item>
                    <v-btn
                        class="mx-2"
                        :input-value="active_item == 'edit'"
                        active-class="purple white--text"
                        depressed
                        rounded
                        @click="onEditProfileClicked()"
                    >
                        Edit profile
                    </v-btn>
                    </v-slide-item>
                    <v-slide-item>
                    <v-btn
                        class="mx-2"
                        :input-value="active_item == 'users'"
                        active-class="purple white--text"
                        depressed
                        rounded
                        @click="onUsersClicked()"
                    >
                        Users
                    </v-btn>
                    </v-slide-item>
                    <v-slide-item>
                    <v-btn
                        class="mx-2"
                        :input-value="active_item == 'chat'"
                        active-class="purple white--text"
                        depressed
                        rounded
                        @click="onChatClicked()"
                    >
                        Chat
                    </v-btn>
                    </v-slide-item>
                    <v-slide-item>
                    <v-btn
                        class="mx-2"
                        :input-value="active_item == 'about'"
                        active-class="purple white--text"
                        depressed
                        rounded
                        @click="onAboutClicked()"
                    >
                        About
                    </v-btn>
                    </v-slide-item>
                </v-slide-group>
            </v-col>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>

export default {
  name: 'MainMenu',
  data() {
    return {
    }
  },
  computed: {
    },
  props: {
    active_item: String
  },
  methods: {
    onError(){
    },
    onMyPlannerClicked(){
        this.$router.push({ path: '/' }).catch(this.onError);
    },
    onEditProfileClicked(){
        this.$router.push({ path: '/edit' }).catch(this.onError);
    },
    onUsersClicked(){
        this.$router.push({ path: '/users' }).catch(this.onError);
    },
    onChatClicked(){
        this.$router.push({ path: '/chat' }).catch(this.onError);
    },
    onAboutClicked(){
        this.$router.push({ path: '/about' }).catch(this.onError);
    },
  },
}
</script>