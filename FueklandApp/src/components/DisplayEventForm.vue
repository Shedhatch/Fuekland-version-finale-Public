<template>
  <div class="hello">
    <h1>On s'ennuie ? Créez un événement !</h1>
    <br />
    <form name="eventForm" class="loginForm" ref="eventForm" onsubmit="return false;">
      <label for="eventName"><b>Donnez un nom a votre evenement</b></label
      ><br />
      <input type="text" name="fname" required/><br />
      <label for="eventName"><b>Décrivez votre événement</b></label><br />
      <textarea id="story" name="story"
      rows="10" cols="53" required>
      </textarea><br />
      <label for="bday"><b>Ajoutez une date et une heure de début</b></label><br />
      <input type="datetime-local" id="meeting-time"
       name="meeting-time" value="2018-06-12T19:30"
       min="2018-06-07T00:00" max="2018-06-14T00:00">
      <br />
        <label for="eventEnd"><b>Ajoutez une date et une heure de fin</b></label><br />
      <input type="datetime-local" id="meeting-time"
       name="meeting-time" value="2018-06-12T19:30"
       min="2018-06-07T00:00" max="2018-06-14T00:00">
      <br />
    <label for="eventName"><b>Ajoutez un lieu de l'événement</b></label
      ><br />
      <input type="text" name="fname" required/><br />
<br />
     
      <button type="submit" @click="createEvent();">Créez mon événement</button
      ><br />
            <router-link class="redirect" to="/event">Au final non !</router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: "EventForm",

  methods: {},
};
</script>

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
input[type="datetime-local"],
input[type="password"] {
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-family: arial;
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

/* txt area */

textarea {
  resize: none;
  font-size: 15px;
  font-family: arial;
  border: none;
}

</style>