<template>
  <th>
    <tr class="Header">
      <th>
        ID
      </th>
      <th>
        Name
      </th>
      <th>
        Cost
      </th>
    </tr>
  </th>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
  table th {
    text-transform: uppercase;
    text-align: left;
    background: #44475C;
    color: #FFF;
    cursor: pointer;
    padding: 8px;
    width: 75px;
  }
  table th:hover {
    background: #717699;
  }
</style>
