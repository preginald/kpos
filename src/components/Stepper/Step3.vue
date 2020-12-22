<template>
  <v-card>
    <v-card-text>
      <v-combobox
        v-on:keyup.enter="setActiveCategory"
        label="Category"
        type="text"
        v-model="selectCategory"
        item-text="name"
        :items="categories"
      ></v-combobox>
    </v-card-text>
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
    ]),
    selectCategory: {
      set(category) {
        this.setSelectedCategory(category);
        this.setSearchByCategory(category);
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
    // selectedCategory: "",
  }),
  methods: {
    // ...mapMutations(["pushProducts", "pushProductToMenu", "pushCategory"]),
    ...mapMutations([
      "pushProducts",
      "pushCategory",
      "setSearchByCategory",
      "setSelectedCategory",
    ]),
    ...mapActions(["saveProductToMenu", "saveProductsToMenu"]),
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