<template>
    <section>
    <div class="container">
      <div class="row">
    
        <div class="col-md-6">
            <p>Retakers Bank</p>
          <form>
            <div class="mb-3">
              <label for="inputEmail" class="form-label">Email</label>
              <input id="email" v-model="email" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password</label>
              <input type="password" v-model="password" class="form-control" id="password" />
            </div>
            <button type='button' @click="login" class="btn btn-primary">LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
    name: "Login",
    props: {},
    data: function() {
        return {
            email: "email",
            password: "password"
        };
    },
    methods: {
       
    }
}
</script>


<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #0f642b;
  color: black;
  padding: 20px 30px;
  margin: 20px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 1.5;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
}

form {
  border: 3px solid #f1f1f1;
  padding: 20px;
  max-width: 400px;
  box-sizing: border-box;
}

p {
  text-align: right !important;
 padding-right: 40px;
 padding-bottom: 20px;
  font-size: 30px;
}
b{
    letter-spacing: 2px;
    font-size: 20px;
}
</style>