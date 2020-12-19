<template>
  <v-container>
    <v-row>
      <Sidebar />
      <v-col cols="12" sm="9">
        <DataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapState } from "vuex";
import Sidebar from "@/components/Sidebar.vue";
import DataTable from "@/components/DataTable.vue";

export default {
  name: "Products",
  components: {
    Sidebar,
    DataTable,
  },
  // computed: mapState([
  //   "debug",
  //   "categories",
  //   "productDatabase",
  //   "prefixes",
  //   "suffixes",
  // ]),
};
</script>