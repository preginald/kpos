<template>
  <v-container>
    <v-row>
      <v-col v-for="(step, i) in steps" :key="i" cols="12" sm="3">
        <v-card>
          <v-card-title> {{ i + 1 }}. {{ step.name }}</v-card-title>
          <v-card-text> {{ step.content }} </v-card-text>
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
        name: "Import",
        content: "First, take the client's menu and import them.",
      },
      {
        name: "Analyse",
        content:
          "Next, we analyse the client's menu and create the POS ready product list.",
      },
      {
        name: "Review",
        content: "Next, we review the POS ready product list.",
      },
      {
        name: "Export",
        content:
          "Finally we export the product list in the format for the specific POS.",
      },
    ],
  }),
};
</script>
