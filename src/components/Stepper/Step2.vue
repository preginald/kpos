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
          <v-btn v-on:click="showForm('prefix')" :value="1" text> PRE </v-btn>
          <v-btn v-on:click="showForm('suffix')" :value="2" text> SUF </v-btn>
          <v-btn v-on:click="showForm('size')" :value="3" text> SIZE </v-btn>

          <v-btn v-on:click="showForm('addminus')" :value="4">
            <v-icon> mdi-contrast </v-icon>
          </v-btn>

          <v-btn v-on:click="showForm('inc')" :value="5" text> INC </v-btn>
        </v-btn-toggle>
      </v-toolbar>
    </v-card-text>
    <MenuTable />
    <v-card-text v-if="form == 'prefix'">
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
          <v-text-field label="Category" v-model="moveCategory"></v-text-field>
        </v-col>
        <v-col>
          <v-btn @click="addPrefix">Add Prefix</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-if="form == 'suffix'">
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
    <v-card-text v-if="form == 'size'">
      <v-row>
        <v-col>
          <v-text-field label="Size name" v-model="size.name"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Size value" v-model="size.value"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            number
            label="Size price"
            v-model="size.price"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn @click="saveSize(size)">Add Size</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-col v-if="selectedCategory.add">
        <v-text-field
          number
          :label="selectedCategory.add.name"
          v-model="selectedCategory.add.price"
          :hint="selectedCategory.add.value"
        ></v-text-field>
      </v-col>
      <v-col v-if="selectedCategory.minus">
        <v-text-field
          number
          :label="selectedCategory.minus.name"
          v-model="selectedCategory.minus.price"
          :hint="selectedCategory.minus.value"
        ></v-text-field>
      </v-col>
    </v-card-actions>
    <v-card-actions v-if="selectedCategory.sizes">
      <v-col v-for="size in selectedCategory.sizes" :key="size.name">
        <v-text-field
          number
          :label="size.name"
          v-model="size.price"
          :hint="size.value"
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
          :hint="prefix.value"
        ></v-text-field>
      </v-col>
    </v-card-actions>
    <v-card-actions v-if="relatedCategories">
      <v-col
        v-for="relatedPrefix in relatedCategories.prefixes"
        :key="relatedPrefix.name"
        cols="12"
        sm="2"
      >
        <v-text-field
          number
          :label="relatedPrefix.name"
          v-model="relatedPrefix.price"
          :hint="relatedPrefix.value"
        ></v-text-field>
      </v-col>
    </v-card-actions>
    <v-card-actions v-if="selectedCategory.suffixes">
      <v-col
        v-for="suffix in selectedCategory.suffixes"
        :key="suffix.name"
        cols="12"
        sm="2"
      >
        <v-text-field
          number
          :label="suffix.name"
          v-model="suffix.price"
          :hint="suffix.value"
        ></v-text-field>
      </v-col>
    </v-card-actions>
    <v-card-actions v-if="selectedCategory.inc || form == 'inc'">
      <v-col>
        <v-text-field
          number
          label="Start price"
          v-model="inc.price"
          v-on:keyup="incPreviewTable"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          number
          label="Inc amount"
          v-model="inc.amount"
          v-on:keyup="incPreviewTable"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="Inc steps"
          v-model="inc.steps"
          v-on:keyup="incPreviewTable"
        ></v-text-field>
      </v-col>
    </v-card-actions>
    <v-card v-if="showPreviewTable">
      <v-card-title> Preview </v-card-title>
      <v-card-actions>
        <v-data-table
          :headers="[
            { text: 'name', value: 'name' },
            { text: 'price', value: 'price' },
          ]"
          :items="previewTableItems"
          :hide-default-footer="false"
          class="elevation-1"
          pagination.sync="pagination"
          item-key="name"
          loading="true"
        >
        </v-data-table>
      </v-card-actions>
    </v-card>
    <v-card-actions>
      <v-btn @click="addProducts" v-if="selectedMenuRows.length"
        >Apply Permutations</v-btn
      >
      <v-btn @click="deleteXmenu" v-if="xmenu.length"
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
      "relatedCategories",
      "selectedMenuRows",
      "categories",
      "productDatabase",
      "e1",
      "steps",
      "xmenu",
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
  mounted() {
    this.checkInc();
  },
  data: () => ({
    activeProductCategory: {},
    productsToInput: 1,
    product: [{ name: "", category: "", price: 0 }],
    category: [{ name: "", value: "" }],
    moveCategory: "",
    toggle_exclusive: null,
    form: null,
    prefix: { name: "", value: "", price: "" },
    relatedPrefix: { name: "", value: "", price: "" },
    suffix: { name: "", value: "", price: "" },
    size: { name: "", value: "", price: "" },
    price: { add: 0, minus: 0 },
    inc: { price: 0, amount: 0, steps: 0 },
    showPreviewTable: false,
    previewTableItems: [],
  }),
  methods: {
    ...mapMutations(["pushProducts", "pushCategory"]),
    ...mapActions([
      "changeCategory",
      "savePrefix",
      "saveSuffix",
      "saveSize",
      "saveInc",
      "saveProductToMenu",
      "saveProductsToMenu",
      "saveProductsToXmenu",
      "deleteXmenu",
    ]),
    checkInc() {
      if (this.selectedCategory.inc) {
        this.inc = this.selectCategory.inc;
      } else {
        // do nothing
      }
    },
    incPreviewTable() {
      this.previewTableItems = [];
      let inc = this.selectCategory.inc ? this.selectedCategory.inc : this.inc;
      if (inc.price > 0 && inc.amount > 0 && inc.steps > 1) {
        this.showPreviewTable = true;
        let i;
        let name = "Item " + inc.price;
        let price = inc.price;
        for (i = 0; i < inc.steps; i++) {
          this.previewTableItems.push({ name: name, price: price });
          price = Number(price) + Number(inc.amount);
          name = "Item " + price;
        }
        this.saveInc(this.inc);
      } else {
        this.showPreviewTable = false;
      }
    },
    showForm(form) {
      if (this.form == form) {
        this.form = null;
      } else {
        this.form = form;
      }
    },
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
        price: this.prefix.price,
      };
      if (this.moveCategory != null) {
        prefix.relatedCategory = this.moveCategory;
      }
      this.savePrefix(prefix);
      this.prefix = { name: "", value: "" };
    },
    addSuffix() {
      let suffix = {
        name: this.suffix.name,
        value: this.suffix.value,
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
        if (product.price != 0) {
          productsArray.push({
            name: product.name,
            category: product.category,
            price: product.price,
          });
        }
        if (this.selectedCategory.add) {
          productsArray = this.permutateAdd(productsArray, product);
        }
        if (this.selectedCategory.minus) {
          productsArray = this.permutateMinus(productsArray, product);
        }

        if (this.selectedCategory.sizes) {
          productsArray = this.permutateSizes(productsArray, product);
        }

        if (this.selectedCategory.inc) {
          productsArray = this.permutateInc(productsArray, product);
        }
      });

      if (this.selectedCategory.suffixes) {
        productsArray = this.permutateSuffixes(productsArray);
      }

      if (this.selectedCategory.prefixes) {
        productsArray = this.permutatePrefixes(productsArray);
      }

      productsArray = this.permutateRelatedCategoryPrefixes(productsArray);

      this.saveProductsToXmenu(productsArray);
    },

    permutateInc(productsArray, product) {
      let inc = this.selectedCategory.inc;
      let i;
      let namePrice = inc.price.split(".")[0];
      let name = product.name + " " + namePrice;
      let category = this.selectCategory.name;
      let price = this.priceToFixed(inc.price);
      for (i = 0; i < inc.steps; i++) {
        productsArray.push({ name: name, category: category, price: price });
        namePrice = Number(price) + Number(inc.amount);
        name = product.name + " " + namePrice;
        price = this.priceToFixed(namePrice);
      }
      return productsArray;
    },

    permutateAdd(productsArray, product) {
      let price = this.priceToFixed(this.selectedCategory.add.price);
      let name = this.selectedCategory.add.value + " " + product.name;
      productsArray.push({
        name: name,
        category: product.category,
        price: price,
      });
      return productsArray;
    },

    permutateMinus(productsArray, product) {
      let price = this.priceToFixed(this.selectedCategory.minus.price);
      let name = this.selectedCategory.minus.value + " " + product.name;
      productsArray.push({
        name: name,
        category: product.category,
        price: price,
      });
      return productsArray;
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

    permutateRelatedCategoryPrefixes(productsArray) {
      if (this.relatedCategories) {
        if (this.relatedCategories.prefixes) {
          productsArray.forEach((product) => {
            this.relatedCategories.prefixes.forEach((prefix) => {
              productsArray.push({
                name: prefix.value + " " + product.name,
                category: this.relatedCategories.name,
                modifier: prefix.name,
                prefix: prefix.name,
                suffix: product.suffix,
                price: this.priceToFixed(
                  Number(product.price) + Number(prefix.price)
                ),
              });
            });
          });
        }
      }
      return productsArray;
    },

    permutateSuffixes(productsArray) {
      productsArray.forEach((product) => {
        this.selectedCategory.suffixes.forEach((suffix) => {
          productsArray.push({
            name: product.name + " " + suffix.value,
            category: product.category,
            modifier: suffix.name,
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