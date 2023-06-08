<template>
    <div>
        <v-dialog
        v-model="dialog_show"
        persistent
        width="500"
        >
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    {{title}}
                </v-card-title>

            <v-card>
            <v-container>
                <v-row>
                <v-col cols="12">
                    <v-text-field
                    v-model = "item_title"
                    label="Title"
                    >
                    </v-text-field>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="12">
                    <v-textarea
                        label="Text"
                        v-model = "item_text"
                    >
                    </v-textarea>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="12">
                    <v-color-picker
                    v-model = "item_color"
                    dot-size="25"
                    hide-canvas
                    hide-inputs
                    hide-mode-switch
                    hide-sliders
                    show-swatches
                    :swatches="swatches"
                    swatches-max-height="200"
                    width = "100%"
                    ></v-color-picker>
                </v-col>
                </v-row>
            </v-container>
            </v-card>

            <v-divider></v-divider>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                v-if="edit"
                color="error"
                text
                @click="onDelete()"
            >
                Delete
            </v-btn>
            <v-btn
                color="primary"
                text
                @click="onSubmit()"
            >
                Apply
            </v-btn>
            <v-btn
                text
                @click="onCancel()"
            >
                Cancel
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>

        <YesNoDialog
            ref="delete_dialog"
            title="Are you sure to delete item?"
            text="The data will be lost"
            yes_text="Yes, delete"
            no_text="No, cancel"
            @yes="onSubmitDelete"
        >
        </YesNoDialog>
        
        <InfoDialog
            ref="bad_data_dialog"
            title="Data error"
            message="Please fill all fields"
        >
        </InfoDialog>

    </div>
</template>

<script>

import YesNoDialog from './YesNoDialog.vue';
import InfoDialog from './InfoDialog.vue';

export default {
  name: 'ItemEditDialog',
  components: { YesNoDialog, InfoDialog, },
  data() {
    return{
        swatches: [
                ['#FFCCCC', '#CCFFCC', '#CCCCFF'],
                ['#FFAAAA', '#AAFFAA', '#AAAAFF'],
                ['#FF8888', '#88FF88', '#8888FF'],
                ['#FFFFCC', '#CCFFFF', '#FFCCFF'],
                ['#FFFFAA', '#AAFFFF', '#FFAAFF'],
                ['#FFFF88', '#88FFFF', '#FF88FF'],
                ['#FFCCAA', '#AAFFCC', '#CCAAFF'],
                ['#FFAACC', '#CCFFAA', '#AACCFF'],
            ],
        dialog_show: false,
        item_title: undefined,
        item_text: undefined,
        item_color: null,
        extre: null,
    }
  },
  computed: {
  },
  props: {
    title: String,
    edit: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    showDialog(extra=null, title=undefined, text=undefined, color=null){
        this.item_title = title;
        this.item_text = text;
        this.item_color = color;
        this.extra = extra;
        this.dialog_show = true;
    },
    hideDialog(){
        this.dialog_show = false;
        this.item_title = undefined;
        this.item_text = undefined;
        this.item_color = null;
        this.extra = null;
    },
    onDelete(){
        this.$refs.delete_dialog.showDialog();
    },
    onSubmitDelete(){
        let data = {
            extra: this.extra,
        };
        this.hideDialog();
        this.$emit("delete", data);
    },
    onSubmit(){
        if(this.isBadInput()){
            this.$refs.bad_data_dialog.showDialog();
        }else{
            let data = {
                title: this.item_title,
                text: this.item_text,
                color: this.item_color,
                extra: this.extra,
            };
            this.hideDialog();
            this.$emit("submit", data);
        }
    },
    isBadInput(){
      return (!this.item_title) || (!this.item_text) || (!this.item_color);
    },
    onCancel(){
        this.hideDialog();
    },
  },
  watch:{
  },
}

</script>