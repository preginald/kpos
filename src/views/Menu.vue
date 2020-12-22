<template>
  <v-container>
    <v-row>
      <Sidebar />
      <v-col cols="12" lg="10" sm="9">
        <Stepper />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Stepper from "@/components/Stepper.vue";

export default {
  name: "Products",
  components: {
    Sidebar,
    Stepper,
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