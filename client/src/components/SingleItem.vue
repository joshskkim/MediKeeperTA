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

</style>
