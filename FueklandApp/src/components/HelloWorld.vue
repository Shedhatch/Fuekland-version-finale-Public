<template>
  <div class="hello">
    <h1>Connexion</h1>
    <br />
    <form class="loginForm" ref="form" onsubmit="return false;">
      <label for="uname"><b>Nom d'utilisateur</b></label
      ><br />
      <input
        type="text"
        placeholder="Entrez un nom d'utilisateur"
        name="uname"
        required
      /><br />
      <label for="psw"><b>Mot de passe</b></label
      ><br />
      <input
        type="password"
        placeholder="Entrez un mot de passe"
        name="psw"
        required
      /><br />
      <button type="submit" @click="login">Me connecter</button><br />
      <router-link class="redirect" to="/signup">Vous n'avez pas de compte ?</router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MainTitle",
  props: {
    msg: String,
  },
  methods: {
    async login() {
      const bodyFormData = new FormData(this.$refs.form);
      const response = await axios.post(
        "http://localhost:3000/_login",
        bodyFormData
      );
      if (response.data >= 1) {
        sessionStorage.setItem("id", response.data);
        this.$router.push("/profile");
        var data = sessionStorage.getItem("id");
        console.log("session storage: ", data);
      } else {
        alert("Le nom d'utilisateur ou le mot de passe est invalide");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

input[type="text"],
input[type="password"] {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.loginForm {

  height: 90%;
  width: 80%;
    display: inline-block;
}

button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 30%;
}

button:hover {
  opacity: 0.8;
  background-color: #0bb878;
  border: none;
}

.redirect {
  font-weight: bold;
  color: #2c3e50;
  font-size: 16px;
}
</style>
