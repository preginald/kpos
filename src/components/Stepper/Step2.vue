<template>
  <v-card>
    <v-card-title> Analyse </v-card-title>
    <v-card-text>
      <v-toolbar dense>
        <v-combobox
          v-on:keyup.enter="setActiveCategory"
          type="text"
          v-model="selectCategory"
          item-text="name"
          :items="categories"
          hide-details
        ></v-combobox>
        <v-spacer></v-spacer>

        <v-btn-toggle v-model="toggle_exclusive" dense group>
          <v-btn v-on:click="togglePrefix" :value="1" text> PREFIX </v-btn>

          <v-btn :value="2" text> SUFFIX </v-btn>

          <v-btn :value="3" text> INCREMENT </v-btn>

          <v-btn :value="4" text> ZULU </v-btn>
        </v-btn-toggle>
      </v-toolbar>
    </v-card-text>
    <v-card-text v-if="form.prefix">
      <v-row>
        <v-col>
          <v-text-field
            label="Prefix name"
            v-model="prefix.name"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Prefix value"
            v-model="prefix.value"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            number
            label="Price variation"
            v-model="prefix.price"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn @click="addPrefix">Add Prefix</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-col
        v-for="prefix in prefixesByCategory"
        :key="prefix.name"
        cols="12"
        sm="2"
      >
        <v-checkbox
          :label="prefix.name"
          v-model="selectedPrefixes"
          :value="prefix.name"
        ></v-checkbox>
      </v-col>
    </v-card-actions>

    <MenuTable />
  </v-card>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

import MenuTable from "@/components/MenuTable.vue";

export default {
  name: "Products",
  components: { MenuTable },
  computed: {
    ...mapState([
      "selectedCategory",
      "categories",
      "productDatabase",
      "e1",
      "steps",
      "prefixesByCategory",
    ]),
    selectCategory: {
      set(category) {
        this.changeCategory(category);
      },
      get() {
        return this.selectedCategory;
      },
    },
    ...mapGetters(["getCategoryByName"]),
  },
  data: () => ({
    activeProductCategory: {},
    productsToInput: 1,
    product: [{ name: "", category: "", price: 0 }],
    category: [{ name: "", value: "" }],
    toggle_exclusive: 0,
    form: {
      prefix: false,
      suffix: false,
      increment: false,
      zulu: false,
    },
    prefix: { name: "", value: "", category: "", price: "" },
    selectedPrefixes: [],
  }),
  methods: {
    ...mapMutations(["pushProducts", "pushCategory"]),
    ...mapActions([
      "changeCategory",
      "saveProductToMenu",
      "saveProductsToMenu",
    ]),
    togglePrefix() {
      this.form.prefix = !this.form.prefix;
    },
    addPrefix() {
      let prefix = {
        name: this.prefix.name,
        value: this.prefix.value,
        category: this.activeProductCategory.name,
        price: this.prefix.price,
      };
      this.prefixes.push(prefix);
      this.prefix = { name: "", value: "" };
      this.getCategoryPrefixes();
    },
    setActiveCategory() {
      if (this.getCategoryByName(this.selectedCategory.name)) {
        //
      } else {
        this.pushCategory({ name: this.selectedCategory });
      }
    },
    getCategoryName() {
      if (typeof this.selectedCategory === "object") {
        return this.selectedCategory.name;
      } else {
        return this.selectedCategory;
      }
    },
    addProductRow() {
      this.product.push({ name: "", price: 0 });
      this.productsToInput++;
    },
    prepareProducts() {
      let productsArray = [];
      this.product.forEach((product) => {
        if (product.name) {
          productsArray.push({
            name: product.name,
            category: this.getCategoryName(),
            price: this.priceToFixed(product.price),
          });
        }
      });
      this.saveProductsToMenu(productsArray);
      this.product = [{ name: "", category: "", price: 0 }];
      this.productsToInput = 1;
    },
    priceToFixed(price) {
      return parseFloat(price).toFixed(2);
    },
    saveProducts() {},
  },
};
</script>