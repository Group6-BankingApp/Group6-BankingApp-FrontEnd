<template>
  <div>
    <Navigation />
    <main>
      <router-view />
    </main>
  </div>
</template>



<script >
import { useUserStoreSession } from './stores/userstoresession';
import Navigation from './components/Navigation.vue'

export default {
  setup() {
    const store = useUserStoreSession();
    return { store };
  },
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
