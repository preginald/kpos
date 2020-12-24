<template>
  <v-col cols="12" lg="2" sm="3">
    <v-card>
      <v-card-title>Categories</v-card-title>
      <v-card-text>
        <div v-for="category in categories" :key="category.name">
          <v-chip small label class="ma-2">{{ category.name }}</v-chip>
        </div>
      </v-card-text>
      <div v-if="selectedCategory.prefixes">
        <v-card-title>Prefixes</v-card-title>
        <v-card-text>
          <div v-for="prefix in selectedCategory.prefixes" :key="prefix.name">
            <v-chip small label class="ma-2">{{ prefix.name }}</v-chip>
          </div>
        </v-card-text>
      </div>
      <div v-if="selectedCategory.suffixes">
        <v-card-title>Suffixes</v-card-title>
        <v-card-text>
          <div v-for="suffix in selectedCategory.suffixes" :key="suffix.name">
            <v-chip small label class="ma-2">{{ suffix.name }}</v-chip>
          </div>
        </v-card-text>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({}),
  computed: mapState([
    "categories",
    "selectedCategory",
    "prefixes",
    "suffixes",
  ]),
};
</script>