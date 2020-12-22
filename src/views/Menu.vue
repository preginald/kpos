<template>
  <v-container>
    <v-row>
      <Sidebar />
      <v-col cols="12" lg="10" sm="9">
        <Stepper />
        <v-card class="mt-2">
          <v-card-actions v-if="stepper == 1">
            <v-btn @click="setStepper(2)">Analyse</v-btn>
          </v-card-actions>
          <v-card-actions v-if="stepper == 2">
            <v-btn @click="setStepper(1)">Back</v-btn>
            <v-btn @click="setStepper(3)">Export</v-btn>
          </v-card-actions>
          <v-card-actions v-if="stepper == 3">
            <v-btn @click="setStepper(2)">Back</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import Sidebar from "@/components/Sidebar.vue";
import Stepper from "@/components/Stepper.vue";

export default {
  name: "Products",
  components: {
    Sidebar,
    Stepper,
  },
  computed: {
    ...mapState(["stepper"]),
  },
  data: () => ({
    activeProductCategory: {},
    productsToInput: 1,
    product: [{ name: "", category: "", price: 0 }],
    category: [{ name: "", value: "" }],
    selectedCategory: "",
  }),
  methods: {
    ...mapMutations(["setStepper"]),
  },
};
</script>