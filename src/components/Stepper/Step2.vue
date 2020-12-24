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

        <v-btn-toggle v-model="toggle_multiple" dense group>
          <v-btn v-on:click="togglePrefix" :value="1" text> PRE </v-btn>

          <v-btn v-on:click="toggleSuffix" :value="2" text> SUF </v-btn>

          <v-btn :value="3">
            <v-icon> mdi-contrast </v-icon>
          </v-btn>

          <v-btn :value="4" text> INC </v-btn>
        </v-btn-toggle>
      </v-toolbar>
    </v-card-text>
    <MenuTable />
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
      <v-col v-if="selectedCategory.add">
        <v-text-field
          number
          label="Price add"
          v-model="price.add"
        ></v-text-field>
      </v-col>
      <v-col v-if="selectedCategory.minus">
        <v-text-field
          number
          label="Price minus"
          v-model="price.minus"
        ></v-text-field>
      </v-col>
    </v-card-actions>
    <v-card-actions v-if="selectedCategory.sizes">
      <v-col v-for="size in selectedCategory.sizes" :key="size.name">
        <v-text-field
          number
          :label="size.name"
          v-model="size.price"
        ></v-text-field>
      </v-col>
    </v-card-actions>
    <v-card-actions v-if="selectedCategory.prefixes">
      <v-col
        v-for="prefix in selectedCategory.prefixes"
        :key="prefix.name"
        cols="12"
        sm="2"
      >
        <v-text-field
          number
          :label="prefix.name"
          v-model="prefix.price"
        ></v-text-field>
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
      <v-btn @click="addProducts">Apply Permutations</v-btn>
      <v-btn @click="deleteXmenu"
        >Delete

        <v-icon right> mdi-trash-can-outline </v-icon>
      </v-btn>
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
      "suffixesByCategory",
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
    price: { add: 0, minus: 0 },
    selectedSuffixes: [],
  }),
  methods: {
    ...mapMutations(["pushProducts", "pushCategory"]),
    ...mapActions([
      "changeCategory",
      "savePrefix",
      "saveSuffix",
      "saveProductToMenu",
      "saveProductsToMenu",
      "saveProductsToXmenu",
      "deleteXmenu",
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
      this.savePrefix(prefix);
      this.prefix = { name: "", value: "" };
    },
    addSuffix() {
      let suffix = {
        name: this.suffix.name,
        value: this.suffix.value,
        category: this.selectedCategory.name,
        price: this.suffix.price,
      };
      this.saveSuffix(suffix);
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
      let productsArray = [];
      this.selectedMenuRows.forEach((product) => {
        if (
          product.price != 0
          //  &&
          // (this.selectedCategory.add != true ||
          //   this.selectCategory.minus != true)
        ) {
          productsArray.push({
            name: product.name,
            category: product.category,
            price: product.price,
          });
        }
        if (this.selectedCategory.add) {
          productsArray.push({
            name: "Add " + product.name,
            category: product.category,
            price: this.priceToFixed(this.price.add),
          });
        }
        if (this.selectedCategory.minus) {
          productsArray.push({
            name: "No " + product.name,
            category: product.category,
            price: this.priceToFixed(this.price.minus),
          });
        }

        if (this.selectedCategory.sizes) {
          productsArray = this.permutateSizes(productsArray, product);
        }
      });

      // if (this.selectedSuffixes.length) {
      //   productsArray.forEach((product) => {
      //     this.selectedSuffixes.forEach((suffix) => {
      //       productsArray.push({
      //         name: product.name + " " + this.getSuffixValue(suffix),
      //         category: product.category,
      //         suffix: suffix,
      //         price: this.priceToFixed(
      //           Number(product.price) + Number(this.getSuffixPrice(suffix))
      //         ),
      //       });
      //     });
      //   });
      // }

      if (this.selectedCategory.prefixes) {
        productsArray = this.permutatePrefixes(productsArray);
      }

      this.saveProductsToXmenu(productsArray);

      // productsArray.forEach((product) => {
      //   this.saveProductsToXmenu(product);
      // });
    },

    permutateSizes(productsArray, product) {
      this.selectedCategory.sizes.forEach((size) => {
        size.price = this.priceToFixed(size.price);
        let name = product.name + " " + this.getSizeValue(size.name);

        if (name && size.price) {
          productsArray.push({
            name: name,
            category: product.category,
            price: size.price,
          });
        }
      });
      return productsArray;
    },

    permutatePrefixes(productsArray) {
      productsArray.forEach((product) => {
        this.selectedCategory.prefixes.forEach((prefix) => {
          productsArray.push({
            name: prefix.value + " " + product.name,
            category: product.category,
            modifier: prefix.name,
            prefix: prefix.name,
            suffix: product.suffix,
            price: this.priceToFixed(
              Number(product.price) + Number(prefix.price)
            ),
          });
        });
      });
      return productsArray;
    },

    permutateSuffixes(productsArray) {
      productsArray.forEach((product) => {
        this.selectedCategory.suffixes.forEach((suffix) => {
          productsArray.push({
            // name: product.name + " " + getSuffixValue(suffix),
            name: product.name + " " + suffix.value,
            category: product.category,
            suffix: suffix.name,
            price: this.priceToFixed(
              Number(product.price) + Number(suffix.price)
            ),
          });
        });
      });
      return productsArray;
    },
    getSizeValue(size) {
      let n = this.selectCategory.sizes.find((e) => e.name == size);
      return n.value;
    },

    getSuffixValue(suffix) {
      let n = this.suffixes.find((e) => e.name == suffix);
      return n.value;
    },

    getSuffixPrice(suffix) {
      let n = this.suffixes.find((e) => e.name == suffix);
      return n.price;
    },
  },
};
</script>