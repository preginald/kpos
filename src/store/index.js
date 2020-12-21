import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    debug: true,
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
  },
  actions: {
    saveProductToMenu({ commit }, product) {
      commit('pushProductToMenu', product);
    },
    saveProductsToMenu({ commit }, products) {
      products.forEach((product) => {
        commit('pushProductToMenu', product);
      });
      // commit('pushProductsToMenu', products);
    },
  },
  modules: {},
  getters: {
    getCategoryByName: (state) => (name) => {
      return state.categories.find((category) => category.name == name);
    },
  },
});
