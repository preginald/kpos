<template>
  <v-app>
    <v-app-bar app dense>
      <v-toolbar-title>KPOS</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/menu">Menu</v-btn>
      <v-btn text to="/products">Products</v-btn>
      <v-btn text to="/test">Test</v-btn>
      <v-spacer></v-spacer>
      <v-switch
        v-model="$store.state.debug"
        label="Debug"
        hide-details
        class="pr-3"
      ></v-switch>
      <v-switch
        v-model="$vuetify.theme.dark"
        :label="$vuetify.theme.dark ? 'Dark' : 'Light'"
        hide-details
      ></v-switch>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
