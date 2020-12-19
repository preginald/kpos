<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="2">
        <v-card>
          <v-card-title>Categories</v-card-title>
          <v-card-text>
            <div v-for="category in categories" :key="category.name">
              <v-chip small label class="ma-2">{{ category.name }}</v-chip>
            </div>
          </v-card-text>
          <div v-if="prefixes.length">
            <v-card-title>Prefixes</v-card-title>
            <v-card-text>
              <div v-for="prefix in prefixes" :key="prefix.name">
                <v-chip small label class="ma-2">{{ prefix.name }}</v-chip>
              </div>
            </v-card-text>
          </div>
          <div v-if="suffixes.length">
            <v-card-title>Suffixes</v-card-title>
            <v-card-text>
              <div v-for="suffix in suffixes" :key="suffix.name">
                <v-chip small label class="ma-2">{{ suffix.name }}</v-chip>
              </div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="10">
        <v-container>
          <v-row>
            <v-col sm="4">
              <v-text-field
                v-on:keyup.enter="addCategory"
                label="Enter categories"
                v-model="category"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <v-col>
              <v-select
                :items="categories"
                v-model="activeProductCategory"
                item-text="name"
                item-value="value"
                label="Select category"
                @change="getCategoryElements"
                return-object
              ></v-select>
            </v-col>
          </v-row>
          <v-row v-if="activeProductCategory.prefix">
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
          <v-row v-if="activeProductCategory.suffix">
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
        </v-container>

        <v-container v-if="activeProductCategory.name">
          <v-row>
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
          </v-row>
          <v-row>
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
          </v-row>
          <v-row v-for="(value, i) in productsToInput" :key="i">
            <v-col>
              <v-combobox
                label="Product"
                type="text"
                v-model="product[i].name"
                :items="productDatabase"
              ></v-combobox>
            </v-col>
            <v-col v-if="activeProductCategory.add">
              <v-text-field
                number
                label="Price add"
                v-model="product[i].addPrice"
              ></v-text-field>
            </v-col>
            <v-col v-if="activeProductCategory.hold">
              <v-text-field
                number
                label="Price hold"
                v-model="product[i].holdPrice"
              ></v-text-field>
            </v-col>
            <v-col
              v-if="!activeProductCategory.add || !activeProductCategory.hold"
            >
              <v-text-field
                number
                label="Price"
                v-model="product[i].price"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn
                v-if="i == product.length - 1"
                @click="addProductRow(product[i].name)"
                >+ 1</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="addProduct">Add Products</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <DataTable />
    <v-row v-if="debug">
      <v-col>
        <h3>Categories</h3>
        <pre>
      {{ categories }}
    </pre
        >
        <h3>Active Category</h3>
        <pre>
      {{ activeProductCategory }}
    </pre
        >

        <h3>Prefixes</h3>
        <pre>
      {{ prefixes }}
    </pre
        >
        <h3>Suffixes</h3>
        <pre>
      {{ suffixes }}
    </pre
        >
        <h3>Products</h3>
        <pre>
      {{ products }}
      {{ selectedSuffixes }}
    </pre
        >
        <h3>Prefixes by category</h3>
        <pre>
      {{ prefixesByCategory }}
    </pre
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import DataTable from "@/components/DataTable.vue";
export default {
  name: "Home",
  methods: {
    addCategory() {
      this.categories.push(this.category);
      this.category = "";
    },
    addProductRow(product) {
      this.removeFromProductDatabase(product);
      this.product.push({ name: "", category: "", price: 0 });
      this.productsToInput++;
    },
    removeFromProductDatabase(product) {
      let index = this.productDatabase.indexOf(product);
      if (index) {
        this.productDatabase.splice(index, 1);
      }
    },
    addProduct() {
      let productsArray = [];
      this.product.forEach((product) => {
        if (product.price) {
          productsArray.push({
            name: product.name,
            category: this.activeProductCategory.name,
            price: product.price,
          });
        }
        if (product.addPrice) {
          productsArray.push({
            name: "Add " + product.name,
            category: this.activeProductCategory.name,
            price: product.addPrice,
          });
        }
        if (product.holdPrice) {
          productsArray.push({
            name: "No " + product.name,
            category: this.activeProductCategory.name,
            price: product.holdPrice,
          });
        }
      });

      if (this.selectedSuffixes.length) {
        productsArray.forEach((product) => {
          this.selectedSuffixes.forEach((suffix) => {
            productsArray.push({
              name: product.name + " " + this.getSuffixValue(suffix),
              category: this.activeProductCategory.name,
              suffix: suffix,
              price:
                Number(product.price) + Number(this.getSuffixPrice(suffix)),
            });
          });
        });
      }
      if (this.selectedPrefixes.length) {
        productsArray.forEach((product) => {
          this.selectedPrefixes.forEach((prefix) => {
            productsArray.push({
              name: this.getPrefixValue(prefix) + " " + product.name,
              category: this.activeProductCategory.name,
              prefix: prefix,
              price:
                Number(product.price) + Number(this.getPrefixPrice(prefix)),
            });
          });
        });
      }
      productsArray.forEach((product) => {
        this.products.push(product);
      });
      // this.product = [{ name: "", price: 0 }];
      this.productsToInput = 1;
      this.product = [{}];
      this.selectedPrefixes = [];
      this.selectedSuffixes = [];
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
    addSuffix() {
      let suffix = {
        name: this.suffix.name,
        value: this.suffix.value,
        category: this.activeProductCategory.name,
        price: this.suffix.price,
      };
      this.suffixes.push(suffix);
      this.suffix = { name: "", value: "" };
      this.getCategorySuffixes();
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
    getCategoryElements() {
      if (this.prefixes.length) {
        this.getCategoryPrefixes();
      }
      if (this.suffixes.length) {
        this.getCategorySuffixes();
      }
    },
    getCategoryPrefixes() {
      this.prefixesByCategory = this.prefixes.filter(
        (prefix) => prefix.category == this.activeProductCategory.name
      );
    },
    getCategorySuffixes() {
      this.suffixesByCategory = this.suffixes.filter(
        (suffix) => suffix.category == this.activeProductCategory.name
      );
    },
  },
  data: () => ({
    debug: true,
    category: "",
    activeProductCategory: {},
    selectedPrefixes: [],
    selectedSuffixes: [],
    prefixesByCategory: [],
    suffixesByCategory: [],
    products: [],
    suffix: { name: "", category: "" },
    prefix: { name: "", category: "" },
    productsToInput: 1,
    product: [{ name: "", category: "", price: 0 }],
  }),
  computed: mapState(["categories", "productDatabase", "prefixes", "suffixes"]),
  components: {
    DataTable,
  },
};
</script>
