<template>
  <v-container>
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
            <v-row>
              <v-col>
                <v-combobox
                  label="Product"
                  type="text"
                  v-model="product.name"
                  :items="productDatabase"
                ></v-combobox>
              </v-col>
              <v-col>
                <v-text-field
                  v-on:keyup.enter="saveProductToMenu"
                  number
                  label="Price"
                  v-model="product.price"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <DataTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import Sidebar from "@/components/Sidebar.vue";
import DataTable from "@/components/DataTable.vue";

export default {
  name: "Products",
  components: {
    Sidebar,
    DataTable,
  },
  //   computed: {
  //       ...mapState([
  //     "categories",
  //     "productDatabase",
  //   ])},
  computed: {
    ...mapState(["categories", "productDatabase"]),
    ...mapGetters(["getCategoryByName"]),
  },
  data: () => ({
    activeProductCategory: {},
    category: [{ name: "", value: "" }],
    selectedCategory: "",
    product: { name: "", price: "" },
  }),
  methods: {
    ...mapMutations(["pushProducts", "pushProductToMenu", "pushCategory"]),
    setActiveCategory() {
      if (this.getCategoryByName(this.selectedCategory.name)) {
        //
      } else {
        // console.log(this.selectedCategory);
        this.pushCategory({ name: this.selectedCategory });
      }
    },
    saveProductToMenu() {
      this.pushProductToMenu(this.product);
    },
  },
};
</script>