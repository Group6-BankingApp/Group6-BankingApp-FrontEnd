<template>
  <div>
    <Navigation />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>



<script >
import { useUserStoreSession } from './stores/userstoresession';
import Navigation from './components/Navigation.vue'
import jwtDecode from "jwt-decode";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  setup() {
    const store = useUserStoreSession();
    return { store };
  },
  mounted(){
    this.store.localLogin();
    this.checkTokenValifity();
  },
  name: "App",
  components: {
    Navigation
  },
  methods: {
    checkTokenValifity() {
      console.log("checkTokenValifity");
      if (this.store.jwt) {
        const decoded = jwtDecode(this.store.jwt);
        const exp = decoded.exp;
        if (Date.now() >= exp * 1000) {
          this.store.logout();
          toast.info("Your session has expired. Please login again.", {
            position: "top-right",
            autoClose: 5000
          });
          setTimeout(() => {
          this.$router.push('/login');
        }, 2500);
        }
      }
      setTimeout(() => {
            this.checkTokenValifity();
          }, 60000);
    },
  },
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
