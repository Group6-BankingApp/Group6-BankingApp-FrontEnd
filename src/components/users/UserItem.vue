<template>
    <tr>
    <td>{{ user.firstName }}</td>
    <td>{{ user.lastName }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.phoneNumber }}</td>
    <td> <button @click="editUser">Edit</button></td>
  </tr>
</template>

<script>
export default {
  name: "UserItem",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    editUser() {
      this.$router.push({ name: 'EditUser', params: { user } });
    }
  }
};
</script>

<style scoped>

</style>