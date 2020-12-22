<template>
  <v-stepper v-model="stepper">
    <v-stepper-header>
      <template v-for="step in steps">
        <v-stepper-step
          :complete="stepper > step.number"
          :key="step.number"
          :step="step.number"
          editable
        >
          {{ step.name }}
        </v-stepper-step>
        <v-divider
          v-if="step.number < steps.length"
          :key="step.name"
        ></v-divider>
      </template>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1"> <Step1 /> </v-stepper-content>
      <v-stepper-content step="2"> <Step2 /> </v-stepper-content>
      <v-stepper-content step="3"> test 3 </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapState } from "vuex";

import Step1 from "@/components/Stepper/Step1.vue";
import Step2 from "@/components/Stepper/Step2.vue";

export default {
  data: () => ({
    stepper: 1,
  }),
  components: { Step1, Step2 },
  computed: mapState(["steps"]),
  methods: {},
};
</script>