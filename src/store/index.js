import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    debug: true,
    stepper: 1,
    steps: [
      { number: 1, name: 'Import' },
      { number: 2, name: 'Analyse' },
      { number: 3, name: 'Review' },
      { number: 4, name: 'Export' },
    ],
    search: '',
    productDatabase: [
      'Potato Cakes',
      'Tomato',
      'Lettuce',
      'Cheese',
      'Onion',
      'Dim Sims',
      'Spring Roll',
      'Whiting',
      'Flake',
      'Junior Flake',
      'Blue Grenadier',
      'Barramundi',
      'Butterfish',
      'Scallops',
      'Calamari Rings',
      'Prawns',
      'Crab Sticks',
      'Fish Cakes',
      'Potato Cakes',
      'Chiko Roll',
      'Corn Jack',
      'Sausage in Batter',
      'Burger in Batter',
      'Chicken Nuggets',
      'Beef Croquette',
      'Chicken Croquette',
      'Cheese Croquette',
      'Pickled Onion',
      'Onion Rings',
      'Chips',
      'Greek',
      'Coleslaw',
      'Pineapple Fritter',
      'Banana Fritter',
      'Plain',
      'Lot',
      'Pineapple',
      'Vegie',
      'Fish',
      'Chicken',
      'Lamb',
      'Lamb and Chicken',
      'Vegetarian',
      'Pitta Bread',
      'Garlic',
      'Garlic Sauce',
      'Garlic Bread',
      'Bacon',
    ],
    menu: [],
    xmenu: [],
    selectedMenuRows: [],
    categories: [
      { name: 'Burgers', value: 'burgers', prefix: true },
      {
        name: 'Burger Extra',
        value: 'burger extra',
        add: { name: 'Add', value: 'Add', price: 0 },
        minus: { name: 'Minus', value: 'No', price: 0 },
      },
      {
        name: 'Fish',
        value: 'fish',
        suffixes: [
          // {
          //   name: 'Grill',
          //   value: 'G',
          //   price: '0.40',
          // },
          // {
          //   name: 'Flour',
          //   value: 'F',
          //   price: '0',
          // },
        ],
      },
      { name: 'Souvlaki', value: 'souvlaki' },
      { name: 'Gyros', value: 'gyros' },
      {
        name: 'Salads',
        value: 'salads',
        sizes: [
          { name: 'Small', value: 'S' },
          { name: 'Large', value: 'L' },
        ],
      },
      { name: 'Chips', value: 'chips' },
      { name: 'Sweets', value: 'sweets' },
      { name: 'Ice Cream', value: 'ice cream' },
      {
        name: 'GF Fish',
        related: 'Fish',
        prefixes: [
          {
            name: 'GF',
            value: 'GF',
            price: '2.00',
          },
        ],
      },
    ],
    products: [],
    product: { name: '', price: 0 },
    asIsMenu: [],
    selectedCategory: '',
    relatedCategory: '',
    relatedCategories: [],
    menuCategories: [],
  },
  mutations: {
    pushProductToMenu(state, product) {
      state.menu.push(product);
    },
    pushProductsToMenu(state, products) {
      state.menu.push(products);
    },
    pushProductToXmenu(state, product) {
      state.xmenu.push(product);
    },
    pushProductsToXmenu(state, products) {
      state.xmenu.push(products);
    },
    pushProducts(state, payload) {
      state.products.push(payload);
    },
    pushCategory(state, payload) {
      state.categories.push(payload);
    },
    clearProductName(state) {
      state.product.name = '';
    },
    setSelectedCategory(state, category) {
      state.selectedCategory = category;
    },
    setMenuCategories(state, categories) {
      state.menuCategories = categories;
    },
    pushMenuCategories(state, category) {
      state.menuCategories.indexOf(category) === -1
        ? state.menuCategories.push(category)
        : console.log('This category already exists');
    },
    setRelatedCategory(state, category) {
      state.relatedCategory = category;
    },
    setRelatedCategories(state, relatedCategories) {
      state.relatedCategories = relatedCategories;
    },
    setRelatedCategoryToSelectedCategory(state, relatedCategory) {
      state.selectedCategory.relatedCategory = [];
      state.selectedCategory.relatedCategory.push({
        name: relatedCategory.name,
      });
    },
    setSearchByCategory(state) {
      state.search = state.selectedCategory.name;
    },
    setSearch(state, search) {
      state.search = search;
    },
    setSelectedMenuRows(state, menuRows) {
      state.selectedMenuRows = menuRows;
    },
    setStepper(state, step) {
      state.stepper = step;
    },
    setPrefixes(state, prefixes) {
      state.prefixesByCategory = prefixes;
    },
    setSuffixes(state, suffixes) {
      state.suffixesByCategory = suffixes;
    },
    pushPrefix(state, prefix) {
      state.categories.push(prefix);
    },
    pushSuffix(state, suffix) {
      state.categories.push(suffix);
    },
    setPrefix(state, prefix) {
      state.selectedCategory.prefixes.push(prefix);
    },
    setInc(state, inc) {
      state.selectedCategory.inc = inc;
    },
    setPrefixToRelatedCategory(state, prefix) {
      if (state.relatedCategory.prefixes == null) {
        state.relatedCategory.prefixes = [];
      }
      state.relatedCategory.prefixes.push(prefix);
    },
    setSuffix(state, suffix) {
      state.selectedCategory.suffixes.push(suffix);
    },
    setSize(state, size) {
      state.selectedCategory.sizes.push(size);
    },
    setXmenu(state, xMenu) {
      state.xmenu = xMenu;
    },
  },
  actions: {
    saveProductToMenu({ state, commit, getters }) {
      let product = state.product;
      product.category = state.selectedCategory.name;
      product.price = parseFloat(product.price).toFixed(2);

      let menuProductByCategory = getters.getMenuProductByNameCategory(product);

      if (typeof menuProductByCategory === 'undefined') {
        commit('pushProductToMenu', {
          name: product.name,
          category: product.category,
          price: parseFloat(product.price).toFixed(2),
        });
        commit('clearProductName');
        commit('pushMenuCategories', product.category);
      } else {
        console.log('Product already exists in menu table');
      }
    },
    saveProductsToMenu({ commit, getters }, products) {
      products.forEach((product) => {
        if (
          typeof getters.getMenuProductByNameCategory(product) === 'undefined'
        ) {
          commit('pushProductToMenu', product);
        }
      });
    },
    saveProductsToXmenu({ commit, getters }, products) {
      products.forEach((product) => {
        if (
          typeof getters.getXmenuProductByNameCategory(product) ===
            'undefined' &&
          product.ommit != true
        ) {
          commit('pushProductToXmenu', product);
        }
      });
    },
    saveProductsToExport({ getters }, products) {
      products.forEach((product) => {
        console.log(getters.getIndexOfExportProductByNameCategory(product));
      });
    },
    savePrefix({ commit, getters }, prefix) {
      prefix.price = parseFloat(prefix.price).toFixed(2);
      if (prefix.relatedCategory == null) {
        if (typeof getters.getCategoryPrefixByName(prefix) === 'undefined') {
          commit('setPrefix', prefix);
        }
      } else {
        let relatedCategory = { name: prefix.relatedCategory };
        commit('pushCategory', relatedCategory);
        commit('setRelatedCategory', relatedCategory);
        commit('setPrefixToRelatedCategory', prefix);
        commit('setRelatedCategoryToSelectedCategory', relatedCategory);
      }
    },
    saveSuffix({ commit, getters }, suffix) {
      suffix.price = parseFloat(suffix.price).toFixed(2);
      if (typeof getters.getCategorySuffixByName(suffix) === 'undefined') {
        commit('setSuffix', suffix);
      }
    },
    saveSize({ commit, getters }, size) {
      size.price = parseFloat(size.price).toFixed(2);
      if (typeof getters.getCategorySizeByName(size) === 'undefined') {
        commit('setSize', size);
      }
    },
    saveInc({ commit, getters }, inc) {
      inc.price = parseFloat(inc.price).toFixed(2);

      if (typeof getters.getCategoryInc === 'undefined') {
        commit('setInc', inc);
      }
    },
    changeCategory({ commit, getters }, category) {
      let relatedCategories = getters.getRelatedCategoriesBySelectedCategory(
        category.name
      );
      commit('setSelectedCategory', category);
      commit('setSearchByCategory', category);
      commit('setRelatedCategories', relatedCategories);
    },
    changeSelectedCategoryFromSidebar({ commit, getters }, category) {
      let categoryObject = getters.getCategoryByName(category);
      commit('setSelectedCategory', categoryObject);
      commit('setSearchByCategory', categoryObject);
    },
    deleteXmenu({ commit }) {
      commit('setXmenu', []);
    },
  },
  modules: {},
  getters: {
    getCategoryIndexByName: (state) => (name) => {
      return state.categories.findIndex((category) => category.name == name);
    },
    getCategoryByName: (state) => (name) => {
      return state.categories.find((category) => category.name == name);
    },
    getRelatedCategoriesBySelectedCategory: (state) => (name) => {
      return state.categories.find((category) => category.related == name);
    },
    getCategoryPrefixIndexByName: (state) => (name) => {
      return state.selectedCategory.prefixes.findIndex(
        (prefix) => prefix.name == name
      );
    },
    getCategoryPrefixByName: (state) => (prefix) => {
      return state.selectedCategory.prefixes.find(
        (categoryPrefix) => categoryPrefix.name === prefix.name
      );
    },
    getCategoryPrefixByValue: (state) => (prefix) => {
      return state.selectedCategory.prefixes.find(
        (categoryPrefix) => categoryPrefix.value === prefix.value
      );
    },
    getCategorySuffixByName: (state) => (suffix) => {
      return state.selectedCategory.suffixes.find(
        (categorySuffix) => categorySuffix.name === suffix.name
      );
    },
    getCategorySizeByName: (state) => (size) => {
      return state.selectedCategory.sizes.find(
        (categorySize) => categorySize.name === size.name
      );
    },
    getCategoryInc: (state) => {
      return state.selectedCategory['inc'];
    },
    getCategorySuffixByValue: (state) => (suffix) => {
      return state.selectedCategory.prefixes.find(
        (categorySuffix) => categorySuffix.value === suffix.value
      );
    },
    getMenuProductByNameCategory: (state) => (product) => {
      return state.menu.find(
        (menuProduct) =>
          menuProduct.name === product.name &&
          menuProduct.category === product.category
      );
    },
    getXmenuProductByNameCategory: (state) => (product) => {
      return state.xmenu.find(
        (xmenuProduct) =>
          xmenuProduct.name === product.name &&
          xmenuProduct.category === product.category
      );
    },
    getExportProductByNameCategory: (state) => (product) => {
      return state.export.find(
        (exportProduct) =>
          exportProduct.name === product.name &&
          exportProduct.category === product.category
      );
    },
    getMenuCategories: (state) => {
      return state.menu
        .map((item) => item.category)
        .filter((value, index, self) => self.indexOf(value) === index);
    },
  },
});
