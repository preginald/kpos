<template>
  <v-card>
    <v-card-title> Import </v-card-title>
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
    <v-card-text v-if="selectedCategory">
      <v-row>
        <v-col>
          <v-combobox
            ref="name"
            label="Product"
            type="text"
            v-model="product.name"
            :items="productDatabase"
          ></v-combobox>
        </v-col>
        <v-col>
          <v-text-field
            number
            label="Price"
            v-model="product.price"
            v-on:keyup.enter="saveProduct()"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn v-if="product.name" @click="saveProduct()">+ 1</v-btn>
        </v-col>
      </v-row>
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
      "categories",
      "selectedCategory",
      "productDatabase",
      "product",
      "steps",
    ]),
    ...mapGetters(["getCategoryByName"]),
    selectCategory: {
      set(category) {
        this.changeCategory(category);
      },
      get() {
        return this.selectedCategory;
      },
    },
  },
  data: () => ({
    productsToInput: 1,
    // product: [{ name: "", price: 0 }],
  }),
  methods: {
    ...mapMutations(["pushProducts", "pushCategory", "setSearchByCategory"]),
    ...mapActions([
      "changeCategory",
      "saveProductToMenu",
      "saveProductsToMenu",
    ]),
    process() {
      console.log(this.selected);
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
    addProductRow(price) {
      this.product.push({ name: "", price: price });
      this.productsToInput++;
    },
    saveProduct() {
      this.saveProductToMenu();
      this.$refs.name.focus();
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
      this.product = [{ name: "", price: 0 }];
      this.productsToInput = 1;
    },
    priceToFixed(price) {
      return parseFloat(price).toFixed(2);
    },
    saveProducts() {},
  },
};
</script>