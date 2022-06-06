<template>
  <div class="hello">
    <h1>Prêt à nous rejoindre ?</h1>
    <br />
    <form class="loginForm" ref="form" onsubmit="return false;">
      <label for="uname"><b>Nom d'utilisateur*</b></label
      ><br />
      <input
        type="text"
        placeholder="Entrez un nom d'utilisateur"
        name="uname"
        required
      /><br />
      <label for="name"><b>Prénom*</b></label
      ><br />
      <input
        type="text"
        placeholder="Entrez votre prénom"
        name="name"
        required
      /><br />
      <label for="fname"><b>Nom*</b></label
      ><br />
      <input
        type="text"
        placeholder="Entrez votre nom"
        name="fname"
        required
      /><br />
      <label for="bday"><b>Date de naissance*</b></label
      ><br />
      <input
        type="text"
        placeholder="Entrez votre date de naissance"
        onfocus="(this.type='date')"
        id="userBday"
        name="current_date"
        min="1940-01-01"
        max="2018-12-31"
        required
      /><br />
      <label for="psw"><b>Mot de passe*</b></label
      ><br />
      <input
        type="password"
        placeholder="Choisissez un mot de passe"
        name="psw"
        required
      /><br />
      <label for="dropDownMenu"><b>Choisissez votre humeur</b></label
      ><br />
      <select class="dropDownMenu" name="dropDownMenu">
        <option value="1">Heureux</option>
        <option value="2">Aimant</option>
        <option value="3">Fasciné</option>
        <option value="4">Amusé</option>
        <option value="5">Triste</option></select
      ><br />
      <label for="checkbox"><b>localisation</b></label
      ><br />
      <div class="radio-toolbar">
        <input
          type="radio"
          id="setActiveLoc"
          name="radioLoc"
          value="1"
          checked
        />
        <label for="setActiveLoc">Activer</label>

        <input
          class="unactivated"
          type="radio"
          id="setUnactiveLoc"
          name="radioLoc"
          value="0"
        />
        <label for="setUnactiveLoc">Désactiver</label>
      </div>
      <p>&nbsp;</p>

      <button type="submit" @click="login">Créer mon compte</button><br />
      <router-link class="redirect" to="/">j'ai déja un compte !</router-link>
    </form>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "SignInForm",

  methods: {},
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
.dropDownMenu,
input[type="date"],
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
  border-width: 15px;
}

button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 30%;
  font-size: 16px;
}

button:hover {
  opacity: 0.8;
  background-color: #0bb878;
  border: none;
}

/*Radio*/

.radio-toolbar {
  margin: 10px;
}

.radio-toolbar input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.radio-toolbar label {
  display: inline-block;
  background-color: #ddd;
  padding: 10px 20px;
  font-family: sans-serif, Arial;
  font-size: 16px;
  border: 2px solid #444;
  border-radius: 4px;
}

.radio-toolbar label:hover {
  background-color: #dfd;
}

.radio-toolbar input[type="radio"]:focus + label {
  border: 2px dashed #444;
  color: white;
}

.radio-toolbar input[type="radio"]:checked + label {
  background-color: #0bb878;
  border-color: #4c4;
  color: white;
}

.redirect {
  font-weight: bold;
  color: #2c3e50;
  font-size: 16px;
}
</style>

