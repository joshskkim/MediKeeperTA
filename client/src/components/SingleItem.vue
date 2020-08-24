<template>
  <div>
    <td>
      {{ item.id }}
    </td>
    <td>
      {{ item.itemname }}
    </td>
    <td>
      {{ item.cost }}
    </td>
  </div>
</template>

<script>
export default {
  name: 'SingleItem',
  props: ['item'],
};
</script>

<style>
  table td {
    text-align: left;
    padding: 8px;
    border-right: 2px solid #7D82A8;
    width: 75px;
  }
  table td:last-child {
    border-right: none;
  }
</style>
