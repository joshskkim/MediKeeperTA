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

</style>
