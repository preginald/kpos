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
      { name: 'Burger Extra', value: 'burger extra', add: true, minus: true },
      { name: 'Fish', value: 'fish', suffix: true, prefix: true },
      { name: 'Souvlaki', value: 'souvlaki' },
      { name: 'Gyros', value: 'gyros' },
      { name: 'Salads', value: 'salads' },
      { name: 'Chips', value: 'chips' },
      { name: 'Sweets', value: 'sweets' },
      { name: 'Ice Cream', value: 'ice cream' },
    ],
    prefixes: [
      {
        name: 'GF',
        value: 'GF',
        category: 'Fish',
        price: '.50',
      },
    ],
    suffixes: [
      {
        name: 'Grill',
        value: 'G',
        category: 'Fish',
        price: '0.40',
      },
      {
        name: 'Flour',
        value: 'F',
        category: 'Fish',
        price: '0',
      },
    ],
    prefixesByCategory: [],
    suffixesByCategory: [],
    products: [],
    asIsMenu: [],
    selectedCategory: '',
  },
  mutations: {
    pushProductToMenu(state, product) {
      state.menu.push(product);
    },
    pushProductsToMenu(state, products) {
      state.menu.push(products);
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
    setXmenu(state, xMenu) {
      state.xmenu = xMenu;
    },
  },
  actions: {
    saveProductToMenu({ commit }, product) {
      commit('pushProductToMenu', product);
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
    saveProductsToExport({ getters }, products) {
      products.forEach((product) => {
        console.log(getters.getIndexOfExportProductByNameCategory(product));
      });
    },
    changeCategory({ commit, getters }, category) {
      commit('setSelectedCategory', category);
      commit('setSearchByCategory', category);
      commit('setPrefixes', getters.getPrefixesByCategory);
      commit('setSuffixes', getters.getSuffixesByCategory);
    },
    deleteXmenu({ commit }) {
      commit('setXmenu', []);
    },
  },
  modules: {},
  getters: {
    getCategoryByName: (state) => (name) => {
      return state.categories.find((category) => category.name == name);
    },
    getMenuProductByNameCategory: (state) => (product) => {
      return state.menu.find(
        (menuProduct) =>
          menuProduct.name === product.name &&
          menuProduct.category === product.category
      );
    },
    getExportProductByNameCategory: (state) => (product) => {
      return state.export.find(
        (exportProduct) =>
          exportProduct.name === product.name &&
          exportProduct.category === product.category
      );
    },
    getIndexOfExportProductByNameCategory: (state) => (product) => {
      return state.export.findIndex(
        (exportProduct) =>
          exportProduct.name === product.name &&
          exportProduct.category === product.category
      );
    },
    getPrefixesByCategory: (state) => {
      return state.prefixes.filter(
        (prefix) => prefix.category == state.selectedCategory.name
      );
    },
    getSuffixesByCategory: (state) => {
      return state.suffixes.filter(
        (suffixes) => suffixes.category == state.selectedCategory.name
      );
    },
  },
});
