<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="step in steps">
          <v-stepper-step
            :complete="e1 > step.number"
            :key="step.number"
            :step="step.number"
          >
            {{ step.name }}
          </v-stepper-step>
          <v-divider
            v-if="step.number < steps.length"
            :key="step.number"
          ></v-divider>
        </template>
      </v-stepper-header>
    </v-stepper>
    <v-row>
      <Sidebar />
      <v-col cols="12" lg="10" sm="9">
        <v-card>
          <v-card-text>
            <v-combobox
              v-on:keyup.enter="setActiveCategory"
              label="Category"
              type="text"
              v-model="selectedCategory"
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
                ></v-text-field>
              </v-col>
              <v-col>
                <v-btn
                  v-if="
                    i == product.length - 1 &&
                    product[i].name &&
                    product[i].price
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
        </v-card>
        <MenuTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import Sidebar from "@/components/Sidebar.vue";
import MenuTable from "@/components/MenuTable.vue";

export default {
  name: "Products",
  components: {
    Sidebar,
    MenuTable,
  },
  computed: {
    ...mapState(["categories", "productDatabase", "e1", "steps"]),
    ...mapGetters(["getCategoryByName"]),
  },
  data: () => ({
    activeProductCategory: {},
    productsToInput: 1,
    product: [{ name: "", category: "", price: 0 }],
    category: [{ name: "", value: "" }],
    selectedCategory: "",
  }),
  methods: {
    // ...mapMutations(["pushProducts", "pushProductToMenu", "pushCategory"]),
    ...mapMutations(["pushProducts", "pushCategory"]),
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
      // this.removeFromProductDatabase(product);
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
    },
    priceToFixed(price) {
      return parseFloat(price).toFixed(2);
    },
    saveProducts() {},
    // saveProduct() {
    //   this.product.category = this.getCategoryName();
    //   this.product.price = parseFloat(this.product.price).toFixed(2);
    //   this.saveProductToMenu(this.product);
    //   this.product = { name: "", price: this.product.price };
    // },
  },
};
</script>