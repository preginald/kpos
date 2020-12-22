<template>
  <v-container>
    <v-row>
      <Sidebar />
      <v-col cols="12" lg="10" sm="9">
        <Stepper />
        <MenuTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Stepper from "@/components/Stepper.vue";
import MenuTable from "@/components/MenuTable.vue";

export default {
  name: "Products",
  components: {
    Sidebar,
    Stepper,
    MenuTable,
  },
  data: () => ({
    activeProductCategory: {},
    productsToInput: 1,
    product: [{ name: "", category: "", price: 0 }],
    category: [{ name: "", value: "" }],
    selectedCategory: "",
  }),
  methods: {},
};
</script>