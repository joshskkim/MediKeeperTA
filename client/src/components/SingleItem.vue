<template>
  <div
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <td>
      {{ item.id }}
    </td>
    <td>
      {{ item.itemname }}
    </td>
    <td class="float-container">
      <div class="float-child">{{ item.cost }}</div>
      <div class="float-child" v-show="hover">
        <button></button>
        <button @click.prevent="$emit('del-item', item.id)" class="del">X</button>
      </div>
    </td>
  </div>
</template>

<script>

export default {
  name: 'SingleItem',
  props: ['item'],
  data() {
    return {
      hover: false,
    };
  },
};
</script>

<style>
  table td {
    text-align: left;
    padding: 8px;
    border-right: 2px solid #7D82A8;
    width: 90px;
  }
  table td:last-child {
    border-right: none;
  }
  .float-container {
    padding: 20px;
  }
  .float-child {
    width: 50%;
    float: left;
  }
</style>
