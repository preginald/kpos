<template>
  <v-card>
    <v-card-title> Analyse </v-card-title>
    <MenuTable />
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

        <v-btn-toggle v-model="toggle_multiple" dense group>
          <v-btn v-on:click="togglePrefix" :value="1" text> PRE </v-btn>

          <v-btn v-on:click="toggleSuffix" :value="2" text> SUF </v-btn>

          <v-btn :value="3" text> +/-</v-btn>

          <v-btn :value="4" text> INC </v-btn>
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
    <v-card-text v-if="form.suffix">
      <v-row>
        <v-col>
          <v-text-field
            label="Suffix name"
            v-model="suffix.name"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Suffix value"
            v-model="suffix.value"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            number
            label="Price variation"
            v-model="suffix.price"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn @click="addSuffix">Add Suffix</v-btn>
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
    <v-card-actions>
      <v-col
        v-for="suffix in suffixesByCategory"
        :key="suffix.name"
        cols="12"
        sm="2"
      >
        <v-checkbox
          :label="suffix.name"
          v-model="selectedSuffixes"
          :value="suffix.name"
        ></v-checkbox>
      </v-col>
    </v-card-actions>
    <v-card-actions>
      <v-btn @click="addProducts">Add Products</v-btn>
    </v-card-actions>
    <XmenuTable class="mt-3" />
  </v-card>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

import MenuTable from "@/components/MenuTable.vue";
import XmenuTable from "@/components/XmenuTable.vue";

export default {
  name: "Products",
  components: { MenuTable, XmenuTable },
  computed: {
    ...mapState([
      "selectedCategory",
      "selectedMenuRows",
      "categories",
      "productDatabase",
      "e1",
      "steps",
      "prefixesByCategory",
      "suffixesByCategory",
      "prefixes",
      "suffixes",
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
    toggle_multiple: [],
    form: {
      prefix: false,
      suffix: false,
      increment: false,
      zulu: false,
    },
    prefix: { name: "", value: "", category: "", price: "" },
    suffix: { name: "", value: "", category: "", price: "" },
    selectedPrefixes: [],
    selectedSuffixes: [],
  }),
  methods: {
    ...mapMutations(["pushProducts", "pushCategory", "pushProductsToXmenu"]),
    ...mapActions([
      "changeCategory",
      "saveProductToMenu",
      "saveProductsToMenu",
    ]),
    togglePrefix() {
      this.form.prefix = !this.form.prefix;
    },
    toggleSuffix() {
      this.form.suffix = !this.form.suffix;
    },
    addPrefix() {
      let prefix = {
        name: this.prefix.name,
        value: this.prefix.value,
        category: this.selectedCategory.name,
        price: this.prefix.price,
      };
      this.prefixesByCategory.push(prefix);
      this.prefix = { name: "", value: "" };
    },
    addSuffix() {
      let suffix = {
        name: this.suffix.name,
        value: this.suffix.value,
        category: this.selectedCategory.name,
        price: this.suffix.price,
      };
      this.suffixesByCategory.push(suffix);
      this.suffix = { name: "", value: "" };
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
    addProducts() {
      console.log(this.selectedMenuRows);
      let productsArray = [];
      this.selectedMenuRows.forEach((product) => {
        if (product.price) {
          productsArray.push({
            name: product.name,
            category: product.category,
            price: product.price,
          });
        }
      });

      if (this.selectedSuffixes.length) {
        productsArray.forEach((product) => {
          this.selectedSuffixes.forEach((suffix) => {
            productsArray.push({
              name: product.name + " " + this.getSuffixValue(suffix),
              category: product.category,
              suffix: suffix,
              price: this.priceToFixed(
                Number(product.price) + Number(this.getSuffixPrice(suffix))
              ),
            });
          });
        });
      }

      productsArray.forEach((product) => {
        this.pushProductsToXmenu(product);
      });
    },

    getPrefixValue(prefix) {
      let n = this.prefixes.find((e) => e.name == prefix);
      return n.value;
    },

    getSuffixValue(suffix) {
      let n = this.suffixes.find((e) => e.name == suffix);
      return n.value;
    },
    getPrefixPrice(prefix) {
      let n = this.prefixes.find((e) => e.name == prefix);
      return n.price;
    },
    getSuffixPrice(suffix) {
      let n = this.suffixes.find((e) => e.name == suffix);
      return n.price;
    },
  },
};
</script>