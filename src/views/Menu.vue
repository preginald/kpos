<template>
  <v-container>
    <v-row>
      <Sidebar />
      <v-col cols="12" lg="10" sm="9">
        <v-card class="mt-2">
          <v-card-actions v-if="stepper == 1">
            <v-divider></v-divider>
            <v-btn @click="setStepper(2)"
              >{{ steps[1].name }}
              <v-icon right> mdi-arrow-right </v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="stepper == 2">
            <v-btn @click="setStepper(1)">
              <v-icon left> mdi-arrow-left </v-icon>
              {{ steps[0].name }}
            </v-btn>
            <v-divider></v-divider>
            <v-btn @click="setStepper(3)"
              >{{ steps[2].name }}
              <v-icon right> mdi-arrow-right </v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="stepper == 3">
            <v-btn @click="setStepper(2)">
              <v-icon left> mdi-arrow-left </v-icon>
              {{ steps[1].name }}
            </v-btn>
            <v-divider></v-divider>
            <v-btn @click="setStepper(4)"
              >{{ steps[3].name }}

              <v-icon right> mdi-arrow-right </v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="stepper == 4">
            <v-btn @click="setStepper(3)">
              <v-icon left> mdi-arrow-left </v-icon>
              {{ steps[2].name }}
              <v-divider></v-divider>
            </v-btn>
          </v-card-actions>
        </v-card>
        <Stepper />
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
    ...mapState(["steps", "stepper"]),
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