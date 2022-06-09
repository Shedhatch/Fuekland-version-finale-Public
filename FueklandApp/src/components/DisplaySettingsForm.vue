<template>
  <div class="hello">
    <h1>Paramètres de votre compte</h1>
    <br />
    <form name="settingsForm" class="loginForm" ref="settingsForm" onsubmit="return false;">
      <label for="uname"><b>Modifier votre nom d'utilisateur</b></label
      ><br />
      <input type="text" :value="[[username]]" placeholder="Entrez un nouveau nom d'utilisateur" name="uname" required/><br />
      <label class="ParentLabel"><b>Sécutité et données personnelles</b></label
      ><br />
      <hr />
      <label for="name"><b>Modifier votre prénom</b></label
      ><br />
      <input type="text" :value="[[iname]]" name="iname" required/><br />
      <label for="fname"><b>Modifier votre nom</b></label
      ><br />
      <input type="text" :value="[[fname]]" name="fname" required/><br />
      <label for="bday"><b>Modifier votre date de naissance</b></label
      ><br />
      <input
        type="text"
        :value="[[bday]]"
        onfocus="(this.type='date')"
        id="userBday"
        name="bday"
        min="1940-01-01"
        max="2018-12-31"
      /><br />
      <label for="psw"><b>Modifier votre mot de passe</b></label
      ><br />
      <input type="password" placeholder="Nouveau mot de passe" value="" name="psw" onsubmit="required()"/><br /><label
        class="ParentLabel"
        ><b>Application</b></label
      ><br />
      <hr />
      <label for="dropDownMenu"><b>Changez d'humeur</b></label
      ><br />
      <select class="dropDownMenu" name="listOfIconsProfile">
        <option :value="[[profileIcon]]" selected readonly="readonly">Actuel: {{ listIcon }} </option>
        <option value="1">Heureux</option>
        <option value="2">Aimant</option>
        <option value="3">Fasciné</option>
        <option value="4">Amusé</option>
        <option value="5">Triste</option></select
      ><br />
      <label for="checkbox"><b>Changez vos options de localisation</b></label
      ><br />
      <div class="radio-toolbar">
        <input
          type="radio"
          id="setActiveLoc"
          name="toggleLoc"
          value="1"
          :checked="setPreButton"
        />
        <label for="setActiveLoc">Activer</label>

        <input
          class="unactivated"
          type="radio"
          id="setUnactiveLoc"
          name="toggleLoc"
          value="0"
          :checked="setPreButton2"
        />
        <label for="setUnactiveLoc">Désactiver</label>
      </div>
      <p>&nbsp;</p>

      <button type="submit" @click="setSettings();">Enregistrer les modifications</button
      ><br />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SettingsForm",
  data: function () {
    return {
      username: "",
      fname: "",
      iname: "",
      bday: "",
      psw: "",
      pswPlaceholder: "******",
      profileIcon: "",
      listIcon: "",
      loc: "",
      setPreButton: "",
      setPreButton2: ""

    };
  },
  created() {
    this.setPreSettings();
  },
  methods: {
   async setSettings() {
     
      const bodyFormData = new FormData(this.$refs.settingsForm);
      console.log("username ", bodyFormData.get('uname'))
      console.log("prenom ", bodyFormData.get('iname'))

      if (bodyFormData.get('psw').length == 0) {
        console.log("in")
      }

        const response = await axios.post(
          "http://localhost:3000/" + sessionStorage.getItem("id") + "/_setSettings",
        bodyFormData
       );

       console.log(response.data)
    },
    async setPreSettings() {

      const response = await axios.get(
        "http://localhost:3000/" + sessionStorage.getItem("id") + "/_getInfos"
      );

      this.username = response.data[0].username;
      this.fname = response.data[0].fname;
      this.iname = response.data[0].iname;
      this.locPreset = response.data[0].locationActivated;
      this.profileIcon = response.data[0].profileIcon;

      //preset for loc options 
      if(this.locPreset == 1) {
        this.setPreButton = "checked"
        this.setPreButton2 = ""
      } else {
        this.setPreButton = ""
        this.setPreButton2 = "checked"
      }

      //get bday in french days
      var date = new Date(response.data[0].birthdayDate);
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var dt = date.getDate();

      if (dt < 10) {
      dt = '0' + dt;
        }
      if (month < 10) {
      month = '0' + month;
      }

      this.bday = (year+'-' + month + '-'+dt);

      //get profile pic
      if(response.data[0].profileIcon == 1) {this.listIcon = "Heureux"}
      else if (response.data[0].profileIcon == 2) {this.listIcon = "Aimant"}
      else if (response.data[0].profileIcon == 3) {this.listIcon = "Fasciné"}
      else if (response.data[0].profileIcon == 4) {this.listIcon = "Amusé"}
      else if (response.data[0].profileIcon == 5) {this.listIcon = "Triste"}

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

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 5px solid #2c3e50;
  margin: 1em 0;
  padding: 0;
}
.ParentLabel {
  color: #2c3e50;
  font-size: 18px;
  float: left;
}
</style>

