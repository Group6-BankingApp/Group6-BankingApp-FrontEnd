<template>
    <tr>
    <td> <input type="checkbox" v-model="isSelected" @change="checkboxChanged" /> </td>
    <td> {{ user.firstName }} </td>
    <td> {{ user.lastName }} </td>
    <td> {{ user.email }} </td>
    <td> {{ user.phoneNumber }} </td>
  </tr>
</template>

<script>
export default {
  name: "UserItem",
  props: {
    user: {
      type: Object,
      required: true
    },
    checked : {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      isSelected: false,
    };
  },
  watch: {
    checked: function (val) {
      this.isSelected = val;
    }
  },
  methods: {
    checkboxChanged() {
      this.$emit("user-selected", this.user);
    }
  }
};
</script>

<style scoped>

</style>