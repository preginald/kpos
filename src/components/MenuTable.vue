<template>
  <v-card v-if="menu.length">
    <v-card-title>
      <v-text-field
        v-model="test"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      v-model="toggleMenuRows"
      :headers="headers"
      :items="menu"
      :search="search"
      item-key="name"
      show-select
    >
      show-select class="elevation-1" >
      <template v-slot:item.name="props">
        <v-edit-dialog
          :return-value.sync="props.item.name"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.name"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data: () => ({
    snack: false,
    snackColor: "",
    snackText: "",
    max25chars: (v) => v.length <= 25 || "Input too long!",
    pagination: {},

    // selected: [],
    headers: [
      { text: "Product", value: "name" },
      { text: "Category", value: "category" },
      { text: "Price", value: "price", align: "end" },
    ],
  }),
  computed: {
    ...mapState(["menu", "search", "selectedMenuRows", "stepper"]),
    test: {
      set(search) {
        this.setSearch(search);
      },
      get() {
        return this.search;
      },
    },
    toggleMenuRows: {
      set(selectedMenuRows) {
        this.setSelectedMenuRows(selectedMenuRows);
      },
      get() {
        return this.selectedMenuRows;
      },
    },
  },
  methods: {
    ...mapMutations(["setSearch", "setSelectedMenuRows"]),
    process() {
      console.log(this.selected);
    },
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
  },
};
</script>