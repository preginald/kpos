<template>
  <v-data-table
    v-if="products.length"
    :headers="headers"
    :items="products"
    class="elevation-1"
  >
  </v-data-table>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    headers: [
      { text: "Product", value: "name" },
      { text: "Prefix", value: "prefix" },
      { text: "Category", value: "category" },
      { text: "Suffix", value: "suffix" },
      { text: "Price", value: "price", align: "end" },
    ],
  }),
  computed: mapState(["products"]),
};
</script>