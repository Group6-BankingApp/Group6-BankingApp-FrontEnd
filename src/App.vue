<script setup>
import Login from './components/Login.vue'
</script>

<template>
  <div>
   
    <router-view />
    <main>
      <Login />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: 50px;
  }


  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
