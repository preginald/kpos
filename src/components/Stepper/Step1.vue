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
    <v-card-text v-if="selectedCategory">
      <v-row v-for="(value, i) in productsToInput" :key="i">
        <v-col>
          <v-combobox
            label="Product"
            type="text"
            v-model="product[i].name"
            :items="productDatabase"
          ></v-combobox>
        </v-col>
        <v-col>
          <v-text-field
            number
            label="Price"
            v-model="product[i].price"
            v-on:keyup.enter="addProductRow()"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn
            v-if="
              i == product.length - 1 && product[i].name && product[i].price
            "
            @click="addProductRow()"
            >+ 1</v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="prepareProducts">Add Products</v-btn>
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
    ...mapState(["categories", "selectedCategory", "productDatabase", "steps"]),
    ...mapGetters(["getCategoryByName"]),
    selectCategory: {
      set(category) {
        this.setSelectedCategory(category);
        this.setSearchByCategory(category);
      },
      get() {
        return this.selectedCategory;
      },
    },
  },
  data: () => ({
    activeProductCategory: {},
    productsToInput: 1,
    product: [{ name: "", category: "", price: 0 }],
    category: [{ name: "", value: "" }],
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