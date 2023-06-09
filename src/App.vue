<template>
  <div>
    <Navigation />
    <router-view />
    <main>
      <Login />
    </main>
  </div>
</template>



<script >
import Login from './components/Login.vue'
import Navigation from './components/Navigation.vue'

export default {
  mounted(){
    this.store.localLogin();
  },
  name: "App",
  components: {
    Navigation
  }
};
</script>

<style >
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
