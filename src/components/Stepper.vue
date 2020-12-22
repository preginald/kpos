<template>
  <v-stepper v-model="stepper">
    <v-stepper-header>
      <template v-for="step in steps">
        <v-stepper-step
          :complete="stepper > step.number"
          :key="step.number"
          :step="step.number"
        >
          {{ step.name }}
        </v-stepper-step>
        <v-divider
          v-if="step.number < steps.length"
          :key="step.name"
        ></v-divider>
      </template>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({}),
  computed: mapState(["stepper", "steps"]),
  methods: {},
};
</script>