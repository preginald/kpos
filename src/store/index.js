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
      'Barramundi',
      'Butterfish',
    ],
    categories: [
      { name: 'Burgers', value: 'burgers', prefix: true },
      { name: 'Burger Extra', value: 'burger extra', add: true, minus: true },
      { name: 'Fish', value: 'fish', suffix: true, prefix: true },
      { name: 'Souvlaki', value: 'souvlaki' },
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
  },
  mutations: {
    pushProducts(state, payload) {
      state.products.push(payload);
    },
    pushCategory(state, payload) {
      state.categories.push(payload);
    },
  },
  actions: {},
  modules: {},
});
