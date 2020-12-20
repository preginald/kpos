<template>
  <v-container>
    <v-row>
      <v-col v-for="step in steps" :key="step.name" cols="12" sm="3">
        <v-card>
          <v-card-title> {{ step.name }}</v-card-title>
          <v-card-text> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  data: () => ({
    steps: [
      {
        name: "Menu import",
      },
      {
        name: "Prepare export",
      },
      {
        name: "Review export",
      },
      {
        name: "Menu export",
      },
    ],
  }),
};
</script>
