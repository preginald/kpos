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
      { number: 3, name: 'Export' },
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
    setStepper(state, step) {
      state.stepper = step;
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
  },
});
