<template>
  <v-row>
    <v-col>
      <h3>Categories</h3>
      <pre>
      {{ categories }}
</pre
      >
      <h3>Prefixes</h3>
      <pre>
      {{ prefixes }}
    </pre
      >
      <h3>Suffixes</h3>
      <pre>
      {{ suffixes }}
    </pre
      >
    </v-col>
  </v-row>
</template>


<script>
import { mapState } from "vuex";

export default {
  data: () => ({}),
  computed: mapState(["categories", "prefixes", "suffixes"]),
};
</script>