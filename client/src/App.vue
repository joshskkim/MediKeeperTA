<template>
  <div id="app">
    <img alt="MediKeeper logo" src="./assets/logo.png">
    <Items v-bind:items='items' />
  </div>
</template>

<script>
import axios from 'axios';
import Items from './components/Items.vue';

const API_URL = 'http://localhost:6060';

export default {
  name: 'App',
  components: {
    Items,
  },
  data() {
    return {
      items: [],
    };
  },
  created() {
    axios.get(`${API_URL}/api/items`)
      .then(({ data }) => {
        this.items = data.data;
      })
      .catch((err) => console.error(err));
  },
};
</script>

<style>
  body {
    font-family: 'Open Sans', sans-serif;
  }

  img {
    margin-left: 10px;
  }
</style>
