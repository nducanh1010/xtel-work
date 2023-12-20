<template>
  <v-sheet fill-height justify="center" align="center">
    <v-col>
      <EmployeeTableSearch />
    </v-col>
    <v-col>
      <EmployeeTable />
    </v-col>
  </v-sheet>
</template>
<script>
export default {
  name: 'EmployeeManagement',
  head: {
    title: 'Employee',
    meta: [
      {
        hid: 'Employee',
        name: 'Employee',
        content: 'Employee description'
      }
    ]
  }
}
</script>
<style></style>
