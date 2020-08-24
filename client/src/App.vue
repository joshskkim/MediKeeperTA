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
        <h1>Edit {{ comparedItem.itemname }}</h1>
      </template>

      <template v-slot:body>
        <label for="namechange">Change {{ comparedItem.itemname }}'s name:</label>
        <input type="text" v-model="editingItem.itemname" id="namechange">
        <label for="costchange">Change {{ comparedItem.itemname }}'s cost:</label>
        <input type="number" v-model="editingItem.cost" id="costchange">
      </template>

      <template v-slot:footer>
        <button
          @click="$refs.editModal.closeModal()"
        >
          Cancel
        </button>
        <button
          @click="handlePatch"
        >
          Save
        </button>
      </template>
    </modal>
    <h2 v-show="maxPriceItem.id">
      The most you've paid for
      {{ maxPriceItem.itemname }}
      is
      {{ maxPriceItem.cost }}
    </h2>
    <button v-show="maxPriceItem.id" @click="handleUnfilter">See all items</button>
    <button
      v-show="!creatingItem"
      @click="creatingItem = true"
      id="createButton"
    >
      Create A New Item
    </button>
    <form v-show="creatingItem">
      <label for="nameinput">Input name:</label>
      <input type="text" v-model="newItem.name" id="nameinput" required>
      <label for="costinput">Input cost:</label>
      <input type="number" v-model="newItem.cost" id="costinput" required>
      <button
        @click="creatingItem = false"
      >
        Cancel
      </button>
      <button
        @click="handleAdd"
      >
        Save
      </button>
    </form>
  </div>
</template>

<script>
/* eslint-disable no-self-compare */

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
      editingItem: {},
      comparedItem: {},
      newItem: {},
      creatingItem: false,
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
    handleAdd() {
      this.creatingItem = false;
      this.newItem.id = this.items[this.items.length - 1].id + 1;
      axios.post(`${API_URL}/api/items`, this.newItem);
      this.newItem = {};
    },
    handleDelete(value) {
      axios.delete(`${API_URL}/api/items/${value}`);
      const index = this.items.map((item) => item.id).indexOf(value);
      this.items.splice(index, 1);
      if (this.allItems[0]) {
        this.allItems.splice(index, 1);
      }
    },
    handleEdit(item) {
      this.$refs.editModal.openModal();
      this.editingItem = item;
      this.comparedItem = item;
    },
    handlePatch() {
      this.$refs.editModal.closeModal();
      let namechanged = false;
      let costchanged = false;

      if (this.comparedItem.itemname !== this.editingItem.itemname) {
        namechanged = true;
      }

      if (this.comparedItem.cost !== this.comparedItem.cost) {
        costchanged = true;
      }

      if (namechanged && costchanged) {
        axios.post(`${API_URL}/api/items`, {
          id: this.editingItem.id,
          name: this.editingItem.itemname,
          cost: this.editingItem.cost,
        });
      } else if (namechanged) {
        axios.patch(`${API_URL}/api/items/name`, {
          id: this.editingItem.id,
          name: this.editingItem.itemname,
        });
      } else if (costchanged) {
        axios.patch(`${API_URL}/api/items/cost`, {
          id: this.editingItem.id,
          cost: this.editingItem.cost,
        });
      } else {
        console.log(`You did not edit ${this.editingItem.itemname}`);
      }
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

  #createButton {
    margin: 10px;
    width: 323px;
  }
</style>

<style scoped>
  button {
    background: #2196F3;
    color: white;
    border: 1px solid grey;
    border-left: none;
    margin-left: 10px;
  }
</style>
