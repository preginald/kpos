<template>
  <v-card v-if="menu.length">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="menu"
      :search="search"
      item-key="name"
      show-select
      class="elevation-1"
    >
    </v-data-table>
    <v-card-actions>
      <v-btn @click="process">Go!</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    selected: [],
    search: "",
    headers: [
      { text: "Product", value: "name" },
      { text: "Category", value: "category" },
      { text: "Price", value: "price", align: "end" },
    ],
  }),
  computed: mapState(["menu"]),
  methods: {
    process() {
      console.log(this.selected);
    },
  },
};
</script>