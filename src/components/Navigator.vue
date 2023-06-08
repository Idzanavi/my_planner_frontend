<template>
  <div>
    <v-container>

      <v-row dense>
          <v-col cols="12">
            <v-btn
              outlined
              block
              small
              text
              @click="goPrev()"
            >
            &lt;&lt; Previous
            </v-btn>
          </v-col>
        </v-row>

        <v-row
          v-for="n in num_items"
          :key="'link_item_'+n"
          dense
        >
          <v-col cols="12">
            <v-btn
              outlined
              block
              small
              :text="!isCurrentWeek(n)"
              @click="navigate(n)"
            >
              {{ buttonText(n) }}
            </v-btn>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12">
            <v-btn
              outlined
              block
              small
              text
              @click="goNext()"
            >
            Next &gt;&gt;
            </v-btn>
          </v-col>
        </v-row>

      </v-container>
    </div>
</template>


<script>


import {weekStart, addDays, dateFormat} from '../js/common.js';

function makeLabel(start_date){
    let mon_date = start_date;
    let sun_date = addDays(start_date, 6);
    return "[" + dateFormat(mon_date) + " - " + dateFormat(sun_date) + "]";
}

export default {
  name: 'Navigator',
  data() {
    return {
        start_date: new Date(),
        num_items: 15,
    }
  },
  computed: {
    },
  props: {
  },
  methods: {
    weekNo(row_idx){
      return this.$store.state.start_week_no + row_idx - 1;
    },
    buttonText(row_idx){
      return makeLabel(weekStart(this.weekNo(row_idx)));
    },
    isCurrentWeek(row_idx){
      return this.weekNo(row_idx) == this.$store.state.active_week_no;
    },
    navigate(row_idx){
      this.$store.dispatch('SET_ACTIVE_WEEK_NO', this.weekNo(row_idx));
    },
    goPrev(){
      this.$store.dispatch('SET_START_WEEK_NO', this.$store.state.start_week_no - 1);
    },
    goNext(){
      this.$store.dispatch('SET_START_WEEK_NO', this.$store.state.start_week_no + 1);
    },
  },
}
</script>