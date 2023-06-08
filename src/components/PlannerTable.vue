<template>
  <div id="planner_table">
    <v-container>
      <v-row no-gutters>
        <v-col></v-col>
        <v-col
          v-for="n in 7"
          :key="'header_'+n"
        >
          <v-sheet>
            <v-card
              elevation="2"
            >
              <v-card>
                {{getDay(n)}}
              </v-card>
              <v-card>
                {{getDate(n)}}
              </v-card>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row
        dense
        v-for="m in 16"
        :key="'row_'+m"
      >
        <v-col>
          <v-card height="100%">
            {{getTimeLabel(m)}}
          </v-card>
        </v-col>
        <v-col
          v-for="n in 7"
          :key="'cell_'+m+'_'+n"
        >
          <v-sheet>
            <div data-app class="text-center d-flex align-center justify-space-around" v-if="hasItem(n, m)">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn 
                    rounded
                    small
                    block
                    :color="getItemColor(n, m)"
                    v-bind="attrs"
                    v-on="on"
                    v-on:click="editDialogShow(n, m)"
                  >
                    {{ getItemTitle(n, m) }}
                  </v-btn>
                </template>
                <span>{{getItemText(n, m)}}</span>
              </v-tooltip>
            </div>

            <div data-app class="text-center d-flex align-center justify-space-around" v-if="!hasItem(n, m)">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-if="!hasItem(n, m)"
                    rounded
                    small
                    block
                    v-bind="attrs"
                    v-on="on"
                    v-on:click="createDialogShow(n, m)"
                  >
                    -
                  </v-btn>
                </template>
                <span :v-if="isCurUser">Click to add event</span>
              </v-tooltip>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <InfoDialog
      ref="empty_dialog"
      title="No data"
      message="This slot doesn't have data"
    >
    </InfoDialog>

    <ItemEditDialog
      ref = "create_dialog"
      title = "Create new item"
      @submit = "createItem"
    >
    </ItemEditDialog>

    <ItemEditDialog
      ref = "edit_dialog"
      title = "Edit item"
      edit
      @submit = "editItem"
      @delete = "deleteItem"
    >
    </ItemEditDialog>

    <YesNoDialog
      ref="clear_week_dialog"
      title="Are you sure to delete all items of this week?"
      message="The data will be lost"
      yes_text="Yes, delete"
      no_text="No, cancel"
      width="600"
      @yes="deleteThisWeek"
    >
    </YesNoDialog>

    <ItemShowDialog
      ref="item_show_dialog"
    >
    </ItemShowDialog>

  </div>
</template>


<script>

import ItemEditDialog from './ItemEditDialog.vue';
import ItemShowDialog from './ItemShowDialog.vue';
import InfoDialog from './InfoDialog.vue';
import YesNoDialog from './YesNoDialog.vue';

import {extractColor, dateFromWeekDayNo, buildTimeLabel} from '../js/common.js';
import { is_logged_in, auth_get, auth_post, auth_delete, auth_patch, is_cur_user } from '../js/server_utils';

export default {
  name: 'PlannerTable',
  components: {ItemEditDialog, ItemShowDialog, InfoDialog, YesNoDialog, },
  data() {
    return {
      days: ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],
      planner_items: [
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]],
      show_data_dialog: false,
      delete_week_dialog: false,
    }
  },
  computed: {
    loggedIn:{
      get: function(){
        return is_logged_in(this.$store);
      },
    },
  },
  props: {
    user_id: Number,
  },
  methods: {
    getUserId(){
      return this.user_id;
    },
    isCurUser(){
      return is_cur_user(this.$store, this.user_id);
    },
    makeUserIdPath(){
      return (this.isCurUser() || this.getUserId() === null) ? "" : "" + this.getUserId() + "/";
    },
    handleHttpError(error){
      console.log(error.response.status);
    },
    getTimeLabel(id) {
      return buildTimeLabel(id - 1);
    },
    weekNo(){
      return this.$store.state.active_week_no;
    },
    getDate(id) {
      return dateFromWeekDayNo(this.weekNo(), id - 1)
    },
    getDay(id) {
      return this.days[id - 1];
    },
    hasItem(day_idx, slot_idx){
      return this.planner_items[day_idx-1][slot_idx-1];
    },
    getItemTitle(day_idx, slot_idx){
      return this.planner_items[day_idx-1][slot_idx-1] ? this.planner_items[day_idx-1][slot_idx-1].title : "";
    },
    getItemText(day_idx, slot_idx){
      return this.planner_items[day_idx-1][slot_idx-1] ? this.planner_items[day_idx-1][slot_idx-1].text: "";
    },
    getItemColor(day_idx, slot_idx){
      return this.planner_items[day_idx-1][slot_idx-1] ? this.planner_items[day_idx-1][slot_idx-1].color: "#FFFFFF";
    },
    createDialogShow(day_idx, slot_idx){
      if(!this.isCurUser()){
        this.$refs.empty_dialog.showDialog()
      }else{
        let pos = {day: day_idx - 1, slot: slot_idx - 1};
        this.$refs.create_dialog.showDialog(pos);
      }
    },
    editDialogShow(day_idx, slot_idx){
      var item = this.planner_items[day_idx - 1][slot_idx - 1];
      if(!this.isCurUser()){
        this.$refs.item_show_dialog.showDialog(item.title, item.text);
      }else{
        let pos = {day: day_idx - 1, slot: slot_idx - 1};
        this.$refs.edit_dialog.showDialog(pos, item.title, item.text, item.color);
      }
    },
    createItem(data){
      this.createData(data.extra.day, data.extra.slot, data.title, data.text, extractColor(data.color));
    },
    createData(d_idx, s_idx, title_v, text_v, color_v)
    {
      const week_no = this.$store.state.active_week_no;
      const address = "api/item/";
      let data = {'week_no': week_no, 'day_no': d_idx, 'slot_no': s_idx, 'title': title_v, 'text': text_v, 'color': color_v};
      auth_post(this.$store, this.$http, address, data, this.updateItemByResponse, this.handleHttpError);
    },
    editItem(data){
      this.editData(data.extra.day, data.extra.slot, data.title, data.text, extractColor(data.color));
    },
    editData(d_idx, s_idx, title_v, text_v, color_v)
    {
      const week_no = this.$store.state.active_week_no;
      const address = "api/item/" + week_no + "/" + d_idx + "/" + s_idx + "/";
      let data = {'title': title_v, 'text': text_v, 'color': color_v};
      auth_patch(this.$store, this.$http, address, data, this.updateItemByResponse, this.handleHttpError);
    },
    updateItemByResponse(response){
      const week_no = this.$store.state.active_week_no;
      if(response.data && response.data.week_no == week_no){
          this.updateItem(response.data);
          this.$forceUpdate();
        }
    },
    deleteItem(data){
      this.deleteData(data.extra.day, data.extra.slot);
    },
    deleteData(d_idx, s_idx)
    {
      const week_no = this.$store.state.active_week_no;
      const address = "api/item/" + week_no + "/" + d_idx + "/" + s_idx + "/";
      auth_delete(this.$store, this.$http, address, response => {
        if(response.status == 202){
          this.planner_items[d_idx][s_idx] = null;
          this.$forceUpdate();
        }
      }, this.handleHttpError);
    },
    deleteThisWeek()
    {
      const week_no = this.$store.state.active_week_no;
      const address = "api/week/" + week_no + "/";
      auth_delete(this.$store, this.$http, address, this.deleteItemsByResponse, this.handleHttpError);
    },
    deleteItemsByResponse(response){
        if(response.status == 202){
          this.clearItems();
          this.$forceUpdate();
        }
    },
    clearThisWeek(){
      this.$refs.clear_week_dialog.showDialog();
    },
    updateItem(data_item){
      let day_no = data_item.day_no;
      let slot_no = data_item.slot_no;
      if(day_no >= 0 && day_no <= 6 && slot_no >= 0 && slot_no <= 15){
        let title = data_item.title;
        let text = data_item.text;
        let color = data_item.color;
        let item = {title: title, text: text, color: color};
        this.planner_items[day_no][slot_no] = item;
      }
    },
    clearItems(){
      for(let i = 0; i < 7; ++i){
        for(let j = 0; j < 16; ++j){
          this.planner_items[i][j] = null;    
        }
      }
    },
    updateItems(){
      const week_no = this.$store.state.active_week_no;
      const address = "api/week/" + this.makeUserIdPath() + week_no + "/";
      if(this.$store.state.cur_user_id !== undefined && this.$store.state.active_week_no !== undefined){
        auth_get(this.$store, this.$http, address, this.updateItemsByResponse, this.handleHttpError);
      }
    },
    updateItemsByResponse(response){
      this.clearItems();
      if(response.data){
        for(let i = 0; i < response.data.length; ++i){
          this.updateItem(response.data[i]);
        }
        this.$forceUpdate();
      }
    },
  },
  watch:{
    '$store.state.active_week_no':{
      immediate: true,
      handler(){
        //week changed
        this.updateItems();
      }
    },
    '$store.state.cur_user_id':{
      immediate: true,
      handler(){
        //cur user changed
        this.updateItems();
      }
    },
    loggedIn:{
      immediate: true,
      handler(){
        this.updateItems();
      },
    },
  },
  mounted(){
    this.updateItems();
  }
}
</script>