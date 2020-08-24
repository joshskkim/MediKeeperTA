<template>
  <div id="app">
    <img alt="MediKeeper logo" src="./assets/logo.png">
    <Items v-bind:items='items' />
    <SearchBar @search-name="handleSearch" />
  </div>
</template>

<script>
import axios from 'axios';
import Items from './components/Items.vue';
import SearchBar from './components/SearchBar.vue';

const API_URL = 'http://localhost:6060';

export default {
  name: 'App',
  components: {
    Items,
    SearchBar,
  },
  data() {
    return {
      items: [],
    };
  },
  created() {
    axios.get(`${API_URL}/api/items`)
      .then(({ data }) => {
        this.items = data;
      })
      .catch((err) => console.error(err));
  },
  methods: {
    async handleSearch(value) {
      const [list, max] = await Promise.all([
        axios.get(`${API_URL}/api/items/list/${value}`),
        axios.get(`${API_URL}/api/items/${value}`),
      ]);

      console.log(list, max);
    },
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
