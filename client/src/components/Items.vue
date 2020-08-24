<template>
  <table>
    <thead>
      <Header />
    </thead>
    <tbody>
      <tr v-bind:key="item.id" v-for="item in items">
        <SingleItem v-bind:item="item" />
      </tr>
    </tbody>
  </table>
</template>

<script>
import Header from './Header.vue';
import SingleItem from './SingleItem.vue';

export default {
  name: 'Items',
  components: {
    Header,
    SingleItem,
  },
  props: ['items'],
};
</script>

<style>
  table {
    border-collapse: collapse;
    border: 3px solid #44475C;
    margin: 10px 10px 0 10px;
  }
  table tbody tr:nth-child(2n) td {
    background: #D4D8F9;
  }
  table tr:hover {
    opacity: 0.5;
  }
</style>
