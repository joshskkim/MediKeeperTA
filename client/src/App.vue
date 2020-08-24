<template>
  <div id="app">
    <img alt="MediKeeper logo" src="./assets/logo.png">
    <SearchBar @search-name="handleSearch" />
    <Items
      v-bind:items='items'
      @del-item="handleDelete"
      @edit-item="handleEdit"
    />

    <modal ref="editModal">
      <template v-slot:header>
        <h1>Edit {{ editingItemName }}</h1>
      </template>

      <template v-slot:body>
      </template>

      <template v-slot:footer>
        <div>
          <button @click="$refs.editModal.closeModal()">Cancel</button>
          <button @click="$refs.editModal.closeModal()">Save</button>
        </div>
      </template>
    </modal>

    <h2 v-show="maxPriceItem.id">
      The most you've paid for
      {{ maxPriceItem.itemname }}
      is
      {{ maxPriceItem.cost }}
    </h2>
    <button v-show="maxPriceItem.id" v-on:click="handleUnfilter">See all items</button>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from './components/Modal.vue';
import Items from './components/Items.vue';
import SearchBar from './components/SearchBar.vue';

const API_URL = 'http://localhost:6060';

export default {
  name: 'App',
  components: {
    Modal,
    Items,
    SearchBar,
  },
  data() {
    return {
      items: [],
      allItems: [],
      maxPriceItem: {},
      editingItemName: '',
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

      this.allItems = this.items;
      this.items = list.data;
      this.maxPriceItem = max.data;
    },
    handleDelete(value) {
      axios.delete(`${API_URL}/api/items/${value}`);
      const index = this.items.map((item) => item.id).indexOf(value);
      this.items.splice(index, 1);
      if (this.allItems[0]) {
        this.allItems.splice(index, 1);
      }
    },
    handleEdit(name) {
      this.$refs.editModal.openModal();
      this.editingItemName = name;
    },
    handleUnfilter() {
      this.items = this.allItems;
      this.maxPriceItem = {};
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

  button {
    cursor: pointer;
  }

  .overflow-hidden {
    overflow: hidden;
  }
</style>

<style scoped>
  button {
    background: #2196F3;
    color: white;
    border: 1px solid grey;
    border-left: none;
  }
</style>
